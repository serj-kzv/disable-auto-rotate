console.debug('disableLock injecting is starting');
(lock => {
    console.debug('disableLock starts');
    ScreenOrientation.prototype.lock = function () {
        console.debug('A try to execute disableLock');
        if (arguments.length > 0) {
            if (arguments.length > 1) {
                arguments.splice(1);
            }
            arguments[0] = 'any';
        }

        return lock.apply(this, arguments);
    };
    console.debug('disableLock ends');
})(ScreenOrientation.prototype.lock);
console.debug('disableLock injectiong was ended');
