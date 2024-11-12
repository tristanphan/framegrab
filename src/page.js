// Used to keep track of the speed before it becomes to 0 to set it back later
let normalSpeed = 1.0;

// Runs on command, as passed by background
chrome.runtime.onMessage.addListener((message) => {

    // Check to make sure there is a video on the page
    const video = getVideo();
    if (video == null) return;

    // Capture: download current frame
    if (["download", "newtab", "newtabbg"].includes(message)) {

        // Capture frame in a canvas
        video.crossOrigin = "Anonymous";
        const canvas = document.createElement("canvas");
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        canvas.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        try {
            canvas.toDataURL();
        } catch (e) {
            alert("Could not fetch frame, try a different video, website, or source!\n\n" + e);
            return;
        }

        // Reference

        // Base 64-encoded image, uncomment as needed
        // const image64 = canvas.toDataURL('image/png');
        // console.log(image64);

        // Or get blob instead
        // canvas.toBlob((blob) => { console.log(blob); });

        if (message === "download") {

            // Download image from canvas
            const a = document.createElement("a");
            a.style.cssText = "display: none";
            a.href = canvas.toDataURL("image/png");
            a.download = getSecondsSinceEpoch() + ".png";
            document.body.appendChild(a);
            a.click();

        } else {

            var isFullscreen = window.screenY === 0 && window.screenTop === 0;

            // Open new tab
            const newWindow = window.open();

            if (message === "newtabbg") {
                // Tell Background Script to switch tab focus back to this window
                chrome.runtime.sendMessage("");
            } else { // If new window stays open, NOT closed
                video.pause();
            }

            // Set new tab html
            newWindow.document.body.outerHTML = `
                <head>
                    <title>Frame at ${getTimeStamps(video)}</title>
                    <style>
                        div {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin: 0 0 0 0;
                        }
                        h1, p {
                            color: white;
                            text-align:center;
                            opacity: 0.5;
                            margin: 0 0 0 0;
                        }
                        a {
                            text-decoration: none;
                            color: white;
                            text-align: center;
                            opacity: 0.75;
                        }
                        img {
                            border: 5px solid rgba(255, 255, 255, 0.5); border-radius: 15px;
                            height: 60vh;
                            background-color: black;
                        }
                    </style>
                </head>
                
                <body style="background: linear-gradient(135deg, rgba(12,186,186,1) -35%, rgba(56,0,54,1) 100%); font-family: Helvetica, sans-serif;">
                    <div style="margin-top: 2vh; margin-bottom: 1vh;">
                        <h1 style="color: white; opacity: 1;">
                            Frame Capture
                        </h1>
                    </div>
                    <div style="margin-bottom: 2vh;">
                        <a href="${document.URL}">${document.title}</a>
                    </div>
                    <div>
                        <img src="${canvas.toDataURL("image/png")}"
                            alt="Error! Please close this tab and try again!"
                            title="Click on the image to view it in full size"
                            id="image">
                    </div>
                    <div style="margin-top: 1vh;">
                        <a href="${canvas.toDataURL("image/png")}" download="${getSecondsSinceEpoch()}.png"><h1 style="color: white; opacity: 1;">Download</h1></a>
                    </div>
                    <div style="margin-top: 1vh;"> 
                        <h1>
                            ${getTimeStamps(video)}
                            <br>
                            ${video.videoWidth}px / ${video.videoHeight}px
                        </h1>
                    </div>
                    <div style="margin-top: 1vh;">
                        <p>${new Date().toString()}</p>
                    </div>
                    
                </body>`;

            // On click, set page to image with original dimensions
            newWindow.document.getElementById("image").addEventListener("click", () => {
                newWindow.document.querySelectorAll("style").forEach((item) => item.remove());
                newWindow.document.body.outerHTML = `
                    <body style="background: black;">
                        <img src="${canvas.toDataURL("image/png")}" alt="ERROR">
                    </body>
                `
            });

        }

    }

    // Slow: toggle speed between current and 0
    if (message === "slow") {

        // 0 -> Restore
        if (video.playbackRate === 0) {
            if (normalSpeed < 0.0625 || normalSpeed > 16) normalSpeed = 1.0;
            video.playbackRate = normalSpeed;
        }

        // Current -> Set 0
        else {

            video.play();

            normalSpeed = video.playbackRate;
            video.playbackRate = 0.0;

            // One time listener, self destructs on call
            // Simulate pause by turning pause event to play event, restoring speed
            const onPause = function (video, normalSpeed) {
                if (video.playbackRate === 0) {
                    if (normalSpeed < 0.0625 || normalSpeed > 16) normalSpeed = 1.0;
                    video.playbackRate = normalSpeed;
                    video.play();
                    video.removeEventListener("pause", onPause);
                }
            };
            video.addEventListener("pause", () => {
                onPause(video, normalSpeed);
            });
        }
    }
});

function getVideo() {

    const videos = document.querySelectorAll("video");
    let video;

    // Find video with maximum area (height x width) on the page
    if (videos.length === 0) return;
    else if (videos.length === 1) video = videos[0];
    else {
        let maxIndex = 0;
        for (let i = 1; i < videos.length; i++) {
            if (videos[i].videoHeight * videos[i].videoWidth > videos[maxIndex].videoHeight * videos[maxIndex].videoWidth) {
                maxIndex = i;
            }
        }
        if (videos[maxIndex].videoHeight * videos[maxIndex].videoWidth < 4) return;
        video = videos[maxIndex];
    }

    return video;
}

// Turns seconds into HH:MM:SS format
const getSecondsInHMS = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8);

function getTimeStamps(video) {

    let current = getSecondsInHMS(video.currentTime);
    let total = getSecondsInHMS(video.duration);

    // Strip unused place values if zero
    if (total.startsWith("00:")) {
        total = total.substr(3);
        current = current.substr(3);
    }

    return current + " / " + total;
}

function getSecondsSinceEpoch() {
    // Epoch Second
    const now = new Date();
    const utcMilllisecondsSinceEpoch = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    return Math.round(utcMilllisecondsSinceEpoch / 1000);
}