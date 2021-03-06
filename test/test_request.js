var assert = require('assert');
var Request = require('../lib/request');

describe('Request', function() {
    beforeEach(function() {
        this.bucket = {};
        this.client = {};

        this.connection = {
            bucket: this.bucket,
            client: this.client
        };

        this.req = new Request(this.connection, 'foo', { foo: 'bar' }, { baz: 'qux' });
    });

    it('has a conncetion, bucket and client', function() {
        assert.equal(this.req.connection, this.connection);
        assert.equal(this.req.bucket, this.bucket);
        assert.equal(this.req.client, this.client);
    });

    it('has an action and data', function() {
        assert.equal(this.req.action, 'foo');
        assert.deepEqual(this.req.data, { foo: 'bar' });
    });

    it('copies values from options object', function() {
        assert.equal(this.req.baz, 'qux');
    });

    it('stores data', function() {
        this.req.set('foo', { bar: 'baz' });
        assert.deepEqual(this.req.get('foo'), { bar: 'baz' });
    });
});