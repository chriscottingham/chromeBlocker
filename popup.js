function getButton() {
    return document.getElementById("hideStuff");
}


window.addEventListener("load", (event) => {

    getButton().addEventListener("click", (event) => {
        chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
            fixTabContent(tab);
        });
    });
});

