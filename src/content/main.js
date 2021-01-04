
// class ElementMutator {
//     constructor() {
//         this.cssObserverCfg = {attributeFilter: ['style']};
//         this.bodyObserverCfg = {childList: true};
//         this.cssObserver = new MutationObserver(mutations => {
//             mutations.forEach(mutation => {
//                 if (mutation.type === 'attributes') {
//                     this.handleCSS(mutation);
//                 }
//             });
//         });
//         this.bodyObserver = new MutationObserver(mutations => {
//             mutations.forEach(mutation => {
//                 if (mutation.type === 'childList') {
//                     console.debug('mutation.addedNodes', mutation.addedNodes);
//                     for (const node of mutation.addedNodes) {
//                         console.debug('childList mutation');
//                         console.debug(node);
//                         if (node instanceof HTMLBodyElement && node.parentNode === document.documentElement) {
//                             this.startCSSObserver(node);
//                             this.bodyObserver.disconnect();
//                             break;
//                         }
//                     }
//                 }
//             });
//         });
//     }
//
//     start() {
//         console.debug('ElementMutator starts');
//         this.startCSSObserver(document.documentElement);
//         if (document.body) {
//             this.startCSSObserver(document.body);
//         } else {
//             this.startBodyObserver();
//         }
//     }
//
//     startBodyObserver() {
//         this.bodyObserver.observe(document.documentElement, this.bodyObserverCfg);
//     }
//
//     startCSSObserver(targetNode) {
//         this.cssObserver.observe(targetNode, this.cssObserverCfg);
//     }
//
//     handleCSS(mutation) {
//         const style = mutation.target.style;
//         const important = 'important';
//         const transform = 'transform';
//         const transformValue = 'initial';
//
//         if (style.getPropertyPriority(transform) !== important || transformValue !== style.getPropertyValue(transform)) {
//             style.setProperty(transform, transformValue, important);
//         }
//     }
//
// }

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
    // new ElementMutator().start();
    [
        '/content/disableLock.js',
        '/content/disableMozLockOrientation.js'
    ].forEach(path => addScriptFn(path));
};

main();
