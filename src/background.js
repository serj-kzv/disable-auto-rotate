const disableCSSRotationFn = tabId => {
    browser.tabs.insertCSS(tabId, {file: 'disableCSSRotation.css', runAt: 'document_start', cssOrigin: 'user', allFrames: true});
};

const onCreatedFn = ({id}) => disableCSSRotationFn(id);
const onReplacedFn = id => disableCSSRotationFn(id);
const onUpdatedFn = id => {
    disableCSSRotationFn(id);
}

browser.tabs.onCreated.addListener(onCreatedFn);
browser.tabs.onReplaced.addListener(onReplacedFn);
browser.tabs.onUpdated.addListener(onUpdatedFn);
