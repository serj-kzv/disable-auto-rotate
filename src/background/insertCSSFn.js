const insertCSSFn = async (tabId, changeInfo) => {
    if (changeInfo.status === 'loading') {
        console.debug('onUpdated loading status to we will start insertCSS', tabId, changeInfo);
        try {
            await browser.tabs.insertCSS(tabId, {
                file: 'disableCSSRotation.css',
                runAt: 'document_start',
                cssOrigin: 'user',
                allFrames: true
            });
            console.debug('onUpdated tabId and CSS were inserted', tabId);
        } catch (ex) {
            console.debug('Error is occurring due to user CSS inserting', ex);
        }
    }
};

export default insertCSSFn;
