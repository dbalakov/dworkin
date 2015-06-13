module.exports = function(server) {
    server.method = function(method) { method(server.express); };
};