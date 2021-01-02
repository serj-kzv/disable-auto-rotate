(mozLockOrientation => {
    Screen.prototype.mozLockOrientation = function () {
        arguments.splice(1);
        arguments[0] = 'default';

        return mozLockOrientation.apply(this, arguments);
    };
})(Screen.prototype.mozLockOrientation);
