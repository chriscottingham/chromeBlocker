// alert('Hello world');

function setBackgroundColor() {
    console.log("body script");
    document.body.style.backgroundColor = blue;
}

function hideAmazonStuff() {
    
    let backgroundPage = chrome.extension.getBackgroundPage();
    // backgroundPage.console.log('foo');

    chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: () => {
                document.body.style.backgroundColor = "blue";
            }
        });
    });



    // chrome.scripting.executeScript({
    //     target: { tabId: tab.id },
    //     func: setPageBackgroundColor,
    // });
}

function getButton() {
    return document.getElementById("hideStuff");
}

let backgroundPage = chrome.extension.getBackgroundPage();

function buttonListener(event) {
    getButton().textContent = "buttonListener";
    hideAmazonStuff();
}

window.addEventListener("load", (event) => {
    let button = document.getElementById("hideStuff");
    button.textContent = "onLoad2";
    button.addEventListener("click", buttonListener);
    console.log("onLoad");
});