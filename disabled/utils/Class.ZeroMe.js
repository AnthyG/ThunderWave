(function() {
    var Class,
        __slice = [].slice;

    Class = (function() {
        function Class() {}

        Class.prototype.trace = true;

        Class.prototype.log = function() {
            var args;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            if (!this.trace) {
                return;
            }
            if (typeof console === 'undefined') {
                return;
            }
            args.unshift("[" + this.constructor.name + "]");
            console.log.apply(console, args);
            return this;
        };

        Class.prototype.logStart = function() {
            var args, name;
            name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            if (!this.trace) {
                return;
            }
            this.logtimers || (this.logtimers = {});
            this.logtimers[name] = +(new Date);
            if (args.length > 0) {
                this.log.apply(this, ["" + name].concat(__slice.call(args), ["(started)"]));
            }
            return this;
        };

        Class.prototype.logEnd = function() {
            var args, ms, name;
            name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            ms = +(new Date) - this.logtimers[name];
            this.log.apply(this, ["" + name].concat(__slice.call(args), ["(Done in " + ms + "ms)"]));
            return this;
        };

        return Class;

    })();

    window.Class = Class;

}).call(this);