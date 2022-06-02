const exerciseController = require("../Controllers/exercise.controller");

module.exports = (app) => {
    app.get("/api/exercise", exerciseController.getExercises);
};