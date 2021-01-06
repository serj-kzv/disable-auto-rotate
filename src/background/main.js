import insertCSSFn from "./insertCSSFn.js";
import disableCSPForTheExt from "./disableCSPForTheExt.js";

// var obj = css.parse('body { font-size: 12px; }', options);
// css.stringify(obj, options);


console.debug('background.js start');

const main = () => {
    disableCSPForTheExt();
    // browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
    //     insertCSSFn(tabId, changeInfo);
    // }, {properties: ['status']});
};

main();
