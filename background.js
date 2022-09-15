let color = '#3aa757';

function hideStuff(event) {
    event.button.textContent = "Clicked";
}

chrome.runtime.onInstalled.addListener(() => {
    //   chrome.storage.sync.set({ color });
    console.log("onInstalled triggered");
});

console.log("background.js parsed");

chrome.action.onClicked.addListener((tab) => {

    notehuneth();

    let button = chrome.action.getPopup().document.getElementById("hideStuff");
    button.textContent = "Click from popup.js listener";

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['popup.js']
    });
});

console.log("background.js: supposedly processed action.onclicked listener");