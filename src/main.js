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
        '/disableLock.js',
        '/disableMozLockOrientation.js'
    ].forEach(path => addScriptFn(path));
};

main();
