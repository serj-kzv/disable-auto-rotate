const addScriptFn = async path => {
    const script = document.createElement('script');

    script.async = false;

    const url = browser.runtime.getURL(path);

    console.debug('code url', url);
    script.src = url;

    (document.head || document.documentElement).appendChild(script);

    script.remove();
};
const main = async () => {
    [
        '/web_accessible_resources/disableLock.js',
        '/web_accessible_resources/disableMozLockOrientation.js'
    ].forEach(path => addScriptFn(path));
};

main();
