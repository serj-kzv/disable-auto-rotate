import {cspParserToObjectFn} from "./cspParser.js";

const disableCSPForTheExt = () => {
    browser.webRequest.onHeadersReceived.addListener(
        function (details) {
            // console.debug(details);
            for (var i = 0; i < details.responseHeaders.length; ++i) {
                const header = details.responseHeaders[i];
                const headerName = header.name.toLowerCase();
                // console.debug('header removed', headerName)
                if (headerName === 'content-security-policy') {
                    console.debug('header removed', header);
                    console.debug('header removed value', cspParserToObjectFn(header.value));
                    // details.requestHeaders.splice(i, 1);
                    break;
                }
            }
            return {
                responseHeaders: [
                    ...details.responseHeaders,
                    // {
                    //     name: 'Access-Control-Allow-Origin',
                    //     value: '*'
                    // },
                    // {
                    //     name: 'Content-Security-Policy',
                    //     value: "script-src 'self' moz-extension:; object-src 'self'"
                    // }
                ]
            };
        },
        {urls: ["<all_urls>"]},
        ["blocking", "responseHeaders"]
    );
};

export default disableCSPForTheExt;
