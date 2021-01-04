class ElementMutator {
    start() {
        console.debug('ElementMutator starts');
        new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                switch (true) {
                    case mutation.type === 'childList': {
                        mutation.addedNodes.forEach(node => {
                            console.debug('childList mutation');
                            console.debug(node);
                        });
                        break;
                    }
                    case mutation.type === 'attributes': {
                        console.debug('attributes mutation');
                        console.debug(mutation);
                        console.debug(mutation.target);
                        console.debug(mutation.attributeName);
                        break;
                    }
                }
            });
        }).observe(document.documentElement, {attributeFilter: ['style'], childList: true, subtree: true});
    }
}

const addScriptFn = async path => {
    const script = document.createElement('script');

    script.async = false;

    const url = browser.runtime.getURL(path);

    console.debug('code url', url);
    script.textContent = await (await fetch(url)).text();

    (document.head || document.documentElement).appendChild(script);

    script.remove();
};
const main = async () => {
    // new ElementMutator().start();
    [
        '/content/disableLock.js',
        '/content/disableMozLockOrientation.js'
    ].forEach(path => addScriptFn(path));
};

main();
