var helpers = require('../config/helperFunctions.js');


var users = {};
var max_user_id = 0;

module.exports = function(server) {

    server.get("/", function(req, res, next) {
        helpers.success(res, next, users);
    });

    server.get("/user/:id", function(req, res, next) {
        if (typeof(users[req.params.id]) === undefined) {
            helpers.failure(es, next, 'error', 404);
        }
        helpers.success(res, next, users[parseInt(req.params.id)]);
    });

    server.del("/user/:id", function(req, res, next) {
        if (typeof(users[req.params.id]) === undefined) {
            helpers.failure(es, next, 'error', 404);
        }
        delete users[parseInt(req.params.id)];
        helpers.helpers.success(res, next, []);
    })

    server.post("/user", function(req, res, next) {
        var user = req.params;
        max_user_id++;
        user.id = max_user_id;
        users[user.id] = user;
        helpers.helpers.success(res, next, user);
    })

    server.put("/user/:id", function(req, res, next) {
        if (typeof(users[req.params.id]) === undefined) {
            helpers.failure(es, next, 'error', 404);
        }
        var user = users[parseInt(req.params.id)];
        var updates = req.params;
        for (var field in updates) {
            user[field] = updates[field];
        }
        helpers.helpers.success(res, next, user);
    })

}