
function fixTabContent(tab) {

    let rules = {
        ids: [],
        elements: [],
        classes: []
    };

    if (tab.url.includes("amazon")) {
        // rules.classes = ['nav-right'];
    }
        rules.ids = ["nav-main","nav-swmslot"];
        rules.elements = ['video'];
    hideElements(tab, rules);
}

function hideElements(tab, rules) {

    console.log("Dispatching Element Hiding");

    chrome.scripting.executeScript({
        args: [rules],
        target: { tabId: tab.id },
        func: (rules) => {

            console.log("Executing Hiding in Tab");
            
            function hide(element) {
                element.setAttribute("style", "display: none;");
            }

            for (const thing of rules.ids) {

                console.log("hiding element by id: " + thing);

                let thingElement = document.getElementById(thing);
                if (thingElement) {
                    hide(thingElement);
                }
            }
            for (const thing of rules.elements) {
                for (const offender of document.getElementsByTagName(thing)) {

                    console.log("hiding element by tag: " + thing);

                    hide(offender);
                }
            }
            for (const thing of rules.classes) {
                for (const offenderElement of document.getElementsByClassName(thing)) {
                    console.log("hiding element by class: " + thing);
                    hide(offenderElement);
                }
            }
        }
    });
}

chrome.runtime.onInstalled.addListener(() => {
    //   chrome.storage.sync.set({ color });
    console.log("chromeBlocker installed");
});


//callback: (tabId: number, changeInfo: object, tab: Tab) => void
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    console.log("onUpdated: tabId:" + tabId);
    fixTabContent(tab);
});
//activeInfo: {tabId: number, windowId: number}
chrome.tabs.onActivated.addListener(function (activeInfo) {
    console.log("onActivated: tabId:" + activeInfo.tabId);
    fixTabContent(activeInfo);
});

chrome.webNavigation.onTabReplaced.addListener(function (details) {
    console.log("onTabReplaced");
    fixTabContent(details);
});

chrome.webNavigation.onBeforeNavigate.addListener(function(details){
    console.log("onBeforeNagivate");
    fixTabContent(details);
});

chrome.webNavigation.onCompleted.addListener(function(details){
    console.log("onCompleted: tabId:"+details.tabId+" url:"+details.url);
    fixTabContent(details);
});

chrome.webNavigation.onErrorOccurred.addListener(function(details){
    console.log("onErrorOccurred: tabId:"+details.tabId+" url:"+details.url);
    fixTabContent(details);
});