var assert = require('assert');
var Cache = require('../../ttl-cache-js');
var cache = Cache();

describe('Cache', function() {
    describe('"set", "get"', function () {

        it('', function() {
            assert.equal(0, cache.size());
        });

        it('should return new value when trying to overwitre old value', function () {
            cache.set('key', 'value1'); assert.equal('value1', cache.get('key'));
            cache.set('key', 'value2'); assert.equal('value2', cache.get('key'));
        });

        it('should unset value with ttl', function (done) {
            var ttl = 200;
            this.timeout(300);
            cache.set('key', 'value', ttl);
            assert.equal('value', cache.get('key'));

            setTimeout(function() {
                assert.equal(undefined, cache.get('key'));
                done();
            }, ttl);

        });

        it('should return undefined if key does not exist', function () {
            assert.equal(undefined, cache.get('fake-key'));
        });

        it('should return bool values if bool values are stored', function () {
            cache.set('key1', true);
            cache.set('key2', false);
            assert.equal(true, cache.get('key1'));
            assert.equal(false, cache.get('key2'));
        });

        it('should remove old ttls when trying to set a new one', function (done) {
            this.timeout(300);
            cache.set('key', 'value1', 100);
            cache.set('key', 'value2', 200);
            assert.equal('value2', cache.get('key'));

            setTimeout(function() {
                assert.equal('value2', cache.get('key'));
            }, 100);

            setTimeout(function() {
                assert.equal(undefined, cache.get('key'));
                done();
            }, 200);
        });
    });

    describe('"del", "clear", "size', function () {

        it('should remove value when del', function () {

            cache.set('key', 'value');
            assert.equal('value', cache.get('key'));
            cache.del('key');
            assert.equal(undefined, cache.get('key'));
        });

        it('size is 0 when clear', function () {

            assert.equal(2, cache.size());
            cache.clear();
            assert.equal(0, cache.size());
        });

        it('ttl should be removed when clear', function (done) {

            this.timeout(600);

            cache.clear();
            assert.equal(0, cache.size());
            cache.set('key', 'value1', 500);
            assert.equal('value1', cache.get('key'));
            cache.clear();
            assert.equal(undefined, cache.get('key'));
            cache.set('key', 'value2');
            assert.equal('value2', cache.get('key'));

            setTimeout(function() {
                assert.equal('value2', cache.get('key'));
                assert.equal(1, cache.size());
                done();
            }, 500);

        });

        it('should return valid size', function() {
            cache.clear();
            assert.equal(0, cache.size());
            cache.set('key1', 'value1');
            assert.equal(1, cache.size());
            cache.set('key1', 'value1');
            assert.equal(1, cache.size());
            cache.set('key2', 'value1');
            assert.equal(2, cache.size());
        });
    });

    describe('Instances', function() {

        it('should allow for multiple instances of Cache with "new"', function() {

            var c1 = new Cache(), c2 = new Cache(), c3 = new Cache();
            assert.equal(0, c1.size()); assert.equal(0, c2.size()); assert.equal(0, c3.size());

            c1.set('c1key1', 'value');
            c3.set('c3key1', 'value');
            c3.set('c3key2', 'value');
            assert.equal(1, c1.size()); assert.equal(0, c2.size()); assert.equal(2, c3.size());

            c2.set('c2key1', 'value');
            assert.equal(1, c1.size()); assert.equal(1, c2.size()); assert.equal(2, c3.size());

            c1.set('c1key2', 'value');
            assert.equal(2, c1.size()); assert.equal(1, c2.size()); assert.equal(2, c3.size());

            c2.clear();
            assert.equal(2, c1.size()); assert.equal(0, c2.size()); assert.equal(2, c3.size());

            c1.del('c1key1');
            assert.equal(1, c1.size()); assert.equal(0, c2.size()); assert.equal(2, c3.size());
        });

        it('should allow for multiple instances of Cache without "new"', function() {

            var c1 = Cache(), c2 = Cache(), c3 = Cache();
            assert.equal(0, c1.size()); assert.equal(0, c2.size()); assert.equal(0, c3.size());

            c1.set('c1key1', 'value');
            c3.set('c3key1', 'value');
            c3.set('c3key2', 'value');
            assert.equal(1, c1.size()); assert.equal(0, c2.size()); assert.equal(2, c3.size());

            c2.set('c2key1', 'value');
            assert.equal(1, c1.size()); assert.equal(1, c2.size()); assert.equal(2, c3.size());

            c1.set('c1key2', 'value');
            assert.equal(2, c1.size()); assert.equal(1, c2.size()); assert.equal(2, c3.size());

            c2.clear();
            assert.equal(2, c1.size()); assert.equal(0, c2.size()); assert.equal(2, c3.size());

            c1.del('c1key1');
            assert.equal(1, c1.size()); assert.equal(0, c2.size()); assert.equal(2, c3.size());
        });

    });
});