const exerciseController = require("../Controllers/exercise.controller");

module.exports = (app) => {
    app.get("/api/exercise", exerciseController.getExercises);

    app.get("/api/exercise/:id", exerciseController.getExeriseById);
};