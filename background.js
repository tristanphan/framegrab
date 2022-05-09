// Runs when a keyboard shortcut is pressed
chrome.commands.onCommand.addListener((command) => {

    // Find foreground active tab
    chrome.tabs.query(
        {currentWindow: true, active: true},
        (tabArray) => {

            // Pass command to the foreground tab content script
            chrome.tabs.sendMessage(tabArray[0].id, command);

        }
    );

});

// On call, return tab focus to sender
chrome.runtime.onMessage.addListener((message, sender) => chrome.tabs.update(sender.tab.id, {active: true}))