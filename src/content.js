'use strict';

const addScriptFn = (path) => {
    const script = document.createElement('script');

    script.async = false;
    script.src = browser.runtime.getURL(path);

    (document.head || document.documentElement).appendChild(script);
    script.remove();
};
const mainFn = () => {
    ['./disableLock.js', './disableMozLockOrientation.js'].forEach(path => addScriptFn(path));
};

mainFn();
