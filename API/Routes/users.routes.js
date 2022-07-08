const userController = require('../Controllers/users.controller')

module.exports = (app) => {
    app.get("/api/users/:id", userController.getUserById);

    app.get("/api/login", userController.login);

    app.post("/api/users", userController.createUser);
}