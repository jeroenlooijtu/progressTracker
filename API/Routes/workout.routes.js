const workoutController = require('../Controllers/workout.controller')

const userController = require('../Controllers/users.controller')

module.exports = (app) => {
    app.get("/api/workout/:id", workoutController.getWorkoutById);

    app.get("/api/workoutlist", userController.validateToken, workoutController.getWorkoutForLoggedUser);

    app.post("/api/workout",userController.validateToken ,workoutController.addWorkout);

    app.delete("/api/workout/:id", workoutController.deleteWorkoutById);


}