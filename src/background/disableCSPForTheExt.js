const disableCSPForTheExt = () => {
    browser.webRequest.onBeforeSendHeaders.addListener(
        function (details) {
            console.debug(details);
            for (var i = 0; i < details.requestHeaders.length; ++i) {
                if (details.requestHeaders[i].name === 'Access-Control-Allow-Origin') {
                    details.requestHeaders.splice(i, 1);
                    break;
                }
            }
            return {
                requestHeaders: [
                    ...details.requestHeaders,
                    {
                        name: 'Access-Control-Allow-Origin',
                        value: '*'
                    },
                    {
                        name: 'Content-Security-Policy',
                        value: "script-src 'self' moz-extension:; object-src 'self'"
                    }
                ]
            };
        },
        {urls: ["<all_urls>"]},
        ["blocking", "requestHeaders"]
    );
};

export default disableCSPForTheExt;
