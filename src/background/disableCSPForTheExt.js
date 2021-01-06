import {CspDirective, CspParser, cspParserToObjectFn} from "./cspParser.js";


const disableCSPForTheExt = () => {
    browser.webRequest.onHeadersReceived.addListener(
        function (details) {
            let changedHeaders = [];
            // console.debug(details);
            for (var i = 0; i < details.responseHeaders.length; ++i) {
                const header = details.responseHeaders[i];
                const headerName = header.name.toLowerCase();
                // console.debug('header removed', headerName)
                if (headerName === 'content-security-policy') {
                    console.debug('header removed', header);
                    const parser = new CspParser(header.value);
                    console.debug('header removed value original', header.value);
                    console.debug('header removed object', parser);
                    console.debug('header removed value source', parser.addValue(CspDirective.SCRIPT_SRC, 'moz-extension://*'));
                    console.debug('header removed value changed', parser.toPolicyString());
                    details.responseHeaders.splice(i, 1);
                    changedHeaders.push({
                        name: headerName,
                        value: parser.toPolicyString()
                    });
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
                    ...changedHeaders
                ]
            };
        },
        {urls: ["<all_urls>"]},
        ["blocking", "responseHeaders"]
    );
};

export default disableCSPForTheExt;
