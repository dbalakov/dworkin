var cwd = process.cwd();

var assert   = require("chai").assert;
var bluebird = require("bluebird");
var request  = bluebird.promisifyAll(require('request'));

var Server = require(cwd);

describe('Command', function() {
    it('method', function(done) {
        var server = new Server();
        server.method(function(express) {
            express.post('/', function (req, res) {
                res.send({status: 'ok'});
            });
        });
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
});