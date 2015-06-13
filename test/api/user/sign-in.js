module.exports = function(server) {
    server.express.get('sign-in', function(reg, resp) { resp.json({ method : 'user/sign-in' }); });
};