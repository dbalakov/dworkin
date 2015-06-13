var http    = require('http');
var express = require("express");
var Promise = require("bluebird");

require("express-namespace");

function API() {
    var that = this;

    this.commands = [];
    this.express = express();
    this.server  = Promise.promisifyAll(http.createServer(this.express));

    this.express.set("server", this.server);

    API.PLUGINS.forEach(function(plugin) { plugin(that); });
}

API.prototype.start = function(port) {
    this.commands.forEach(function (command) { command(); });
    return this.server.listenAsync(port);
};

API.prototype.stop = function() {
    return this.server.closeAsync();
};

API.PLUGINS = [
    require('./commands/method'),
    require('./commands/directory')
];

module.exports = API;