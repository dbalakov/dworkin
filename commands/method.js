module.exports = function(server) {
    server.method = function(method) {
        server.commands.push(function() { method(server.express); });
    };
};