var fs = require('fs');

module.exports = function(server) {
    server.directory = function(path, prefix) { readDirectory(server, path, prefix); };
};

function readDirectory(server, path, prefix) {
    function read() {
        var state = fs.lstatSync(path);
        if (state.isFile()) { return require(path)(server); }
        if (state.isDirectory()) {
            function _readDirectory() {
                fs.readdirSync(path).forEach(function(item) { readDirectory(server, path + '/' + item, item); });
            }
            if (prefix) { return server.express.namespace(prefix, _readDirectory); }
            _readDirectory();
        }
    }
    read();
}