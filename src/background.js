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

// Create context menu to save frame
chrome.contextMenus.create({
    title: "Save Frame",
    contexts: ["video"],
    id: "FRAMEGRAB_SAVE_FRAME_CONTEXT_MENU",
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.tabs.sendMessage(tab.id, "newtab");
});