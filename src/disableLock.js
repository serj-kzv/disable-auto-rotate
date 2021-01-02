(lock => {
    ScreenOrientation.prototype.lock = function () {
        arguments.splice(1);
        arguments[0] = 'any';

        return lock.apply(this, arguments);
    };
})(ScreenOrientation.prototype.lock);
