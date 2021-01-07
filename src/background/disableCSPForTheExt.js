import {CspDirective, CspParser} from "./cspParser.js";

const disableCSPForTheExt = () => {
    browser.webRequest.onHeadersReceived.addListener(
        function ({responseHeaders}) {
            let changedHeaders = [];
            // console.debug(details);
            console.debug('browser.runtime.getManifest()', browser.runtime.getManifest());
            for (var i = 0; i < responseHeaders.length; ++i) {
                const header = responseHeaders[i];
                const headerName = header.name.toLowerCase();
                // console.debug('header removed', headerName)
                if (headerName === 'content-security-policy') {
                    console.debug('header removed', header);
                    const parser = new CspParser(header.value);
                    console.debug('header removed value original', header.value);
                    console.debug('header removed object', parser);
                    console.debug('header removed value source', parser.addValue(CspDirective.SCRIPT_SRC, 'moz-extension:'));
                    // parser.removeValueStartsWith(CspDirective.SCRIPT_SRC, "'nonce-");
                    console.debug('header removed value changed', parser.toPolicyString());
                    // responseHeaders.splice(i, 1);
                    console.debug('header removed after', responseHeaders);
                    // changedHeaders.push({
                    //     name: headerName,
                    //     value: parser.toPolicyString()
                    // });
                    break;
                }
            }
            const headerObject = {
                responseHeaders: [
                    ...responseHeaders,
                    // {
                    //     name: 'Access-Control-Allow-Origin',
                    //     value: '*'
                    // },
                    // {
                    //     name: 'Content-Security-Policy',
                    //     value: "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline'"
                    // },
                    ...changedHeaders
                ]
            };
            console.debug('responseHeaders', headerObject.responseHeaders);

            return headerObject;
        },
        {urls: ["<all_urls>"]},
        ["blocking", "responseHeaders"]
    );
};

export default disableCSPForTheExt;
