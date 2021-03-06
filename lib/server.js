var Bucket = require('./bucket');
var Connection = require('./connection');

module.exports = Server;

function Server(io) {
    this.io = io;
    this.buckets = {};
}

Server.prototype.namespace = function(name) {
    return this.io.of(name);
};

Server.prototype.bucket = function(name, bucket) {
    var self = this;

    if (bucket === undefined) {
        bucket = this.buckets[name];
        if (bucket) return bucket;
        bucket = new Bucket();
    }

    this.buckets[name] = bucket;

    this.namespace(name).on('connection', function(client) {
        self.connect(bucket, client);
    });

    return bucket;
};

Server.prototype.connect = function(bucket, client) {
    var connection = new Connection(bucket, client);

    client.on('sync', function() {
        var args = [].slice.apply(arguments);
        connection.sync.apply(connection, args);
    });

    return connection;
};