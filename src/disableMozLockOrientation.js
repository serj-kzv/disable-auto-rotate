console.debug('disableMozLockOrientation injecting is starting');
(mozLockOrientation => {
    console.debug('disableMozLockOrientation starts');
    Screen.prototype.mozLockOrientation = function () {
        console.debug('A try to execute disableMozLockOrientation');
        if (arguments.length > 0) {
            if (arguments.length > 1) {
                arguments.splice(1);
            }
            arguments[0] = 'default';
        }

        return mozLockOrientation.apply(this, arguments);
    };
    console.debug('disableMozLockOrientation ends');
})(Screen.prototype.mozLockOrientation);
console.debug('disableMozLockOrientation injecting was ended');
