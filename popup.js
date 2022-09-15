function hideAmazonStuff() {
    
    chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: () => {
                document.getElementById("nav-main").setAttribute("style","display: none;");
            }
        });
    });
}

window.addEventListener("load", (event) => {
    let button = document.getElementById("hideStuff");
    button.addEventListener("click", (event) => hideAmazonStuff());
});