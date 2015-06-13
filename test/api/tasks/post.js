module.exports = function(server) {
    server.express.post('/', function(reg, resp) { resp.json({ method : 'tasks/post' }); });
};