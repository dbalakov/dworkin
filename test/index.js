var cwd = process.cwd();

var assert   = require("chai").assert;
var sinon = require("sinon");
var bluebird = require("bluebird");
var request  = bluebird.promisifyAll(require('request'));

var Server = require(cwd);

describe('Server', function() {
    it('start', function(done) {
        var server = new Server();
        server.express.post('/', function(req, res) { res.send({ status : 'ok' }); });

        server.start(4012).then(function() {
            return request.postAsync({ url  : 'http://127.0.0.1:4012/', json : true });
        }).then(function(result) {
            assert.deepEqual(result[1], { status : 'ok' }, 'See valid response')
            return result;
        }).then(function() {
            server.stop().then(function() { done(); });
        }).catch(function(error) {
            done(error);
        });
    });

    it('plugins', function() {
        assert.deepEqual(Server.PLUGINS, [ require(cwd + '/plugins/method'), require(cwd + '/plugins/directory') ], 'Plugin function was called');

        var plugin = sinon.spy();

        Server.PLUGINS.push(plugin);
        var server = new Server();

        assert(plugin.calledOnce, 'Plugin function was called');
        assert(plugin.calledWith(server), 'Plugin function was called with valid arguments');

        Server.PLUGINS.pop();
    });
});