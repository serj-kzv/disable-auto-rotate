import insertCSSFn from "./insertCSSFn.js";
import disableCSPForTheExt from "./disableCSPForTheExt.js";

console.debug('background.js start');

const main = () => {
    disableCSPForTheExt();
    browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
        insertCSSFn(tabId, changeInfo);
    }, {properties: ['status']});
};

main();
