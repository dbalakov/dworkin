var cwd = process.cwd();

var assert   = require("chai").assert;
var Promise  = require("bluebird");
var request  = Promise.promisifyAll(require('request'));

var Server = require(cwd);

describe('Plugins', function() {
    it('directory', function(done) {
        var error;
        var server = new Server();
        server.directory(cwd + '/test/api', '/api/v1');
        server.start(4012).then(function() {
            return Promise.all([
                request.getAsync( { url  : 'http://127.0.0.1:4012/api/v1/tasks', json : true }),
                request.postAsync({ url  : 'http://127.0.0.1:4012/api/v1/tasks', json : true }),
                request.getAsync( { url  : 'http://127.0.0.1:4012/api/v1/user/sign-in', json : true })
            ]);
        }).then(function(result) {
            return result.map(function(item) { return item[0].body; });
        }).then(function(result) {
            assert.deepEqual(result, [ { method : 'tasks/get' }, { method : 'tasks/post' }, { method : 'user/sign-in' } ], 'See valid responses');
        }).catch(function(err) { error = err; }).finally(function() {
            server.stop().then(function() { done(error); });
        });
    });
});