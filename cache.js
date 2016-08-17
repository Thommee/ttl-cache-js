module.exports = function() {

    var TTL = {
        data: {},
        set: function(key, ttl, callback) {
            clearTimeout(this.data[key]);
            this.data[key] = setTimeout(callback, ttl);
        },
        del: function(key) {
            clearTimeout(this.data[key]);
            delete this.data[key];
        },
        clear: function() {
            for (var ttl in this.data) {
                if (this.data.hasOwnProperty(ttl)) {
                    clearTimeout(this.data[ttl]);
                }
            }
            this.data = {};
        }
    };

    var store = {
        data: {},
        get: function(key, defaultValue) {
            return this.data.hasOwnProperty(key) ? this.data[key] : defaultValue;
        },
        set: function(key, value) {
            return this.data[key] = value;
        },
        del: function(key) {
            delete this.data[key];
        },
        has: function(key) {
            return this.data.hasOwnProperty(key);
        },
        clear: function() {
            this.data = {};
        },
        size: function() {
            return Object.keys(this.data).length;
        }
    };


    var wrapper = {
        get: function(key, defaultValue) {
            return store.get(key, defaultValue)
        },
        set: function(key, value, ttl) {
            TTL.del(key);
            var result = store.set(key, value);
            ttl > 0 && TTL.set(key, ttl, function() { wrapper.del(key) });
            return result;
        },
        del: function(key) {
            TTL.del(key);
            store.del(key);
        },
        clear: function() {
            TTL.clear();
            store.clear();
        },
        size: function() {
            return store.size();
        },
        has: function(key) {
            return store.has(key);
        }
    };


    // API
    return {
        get: wrapper.get,
        set: wrapper.set,
        del: wrapper.del,
        has: wrapper.has,
        clear: wrapper.clear,
        size: wrapper.size
    }
};