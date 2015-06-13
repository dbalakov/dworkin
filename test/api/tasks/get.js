module.exports = function(server) {
    server.express.get('/', function(reg, resp) { resp.json({ method : 'tasks/get' }); });
};