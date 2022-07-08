let logger = require('tracer').console();
let data = require('../Data/workout.json');
let exerciseController = require('../Controllers/exercise.controller');
let userController = require('../Controllers/users.controller')
let maxId = 2;


//Uc-301: get all workouts

//Uc-302: Get all orkouts for logged in user user
exports.getWorkoutForLoggedUser = (req, res, next) => {
    let {userId} = req.body;
    list = data.filter((work) => work.userId == userId);
    res.status(200).json(list);
}


//Uc-303: Create workout
exports.addWorkout =(req, res, next) => {
    let {body} = req;
    let keys = Object.keys(data[0]);
    keys = keys.filter((key) => key !== "id");
    logger.log(keys);
    bodyKeys = Object.keys(body);
    if(bodyKeys.length != keys.length){
        next({
            message: "mismatch in amount of keys",
            errCode: 400
        })
        return;
    }
    let err;
    keys.forEach((key) => {
        if(!body[key]){
            err = {
                message: "wrong body format",
                errCode: 400
            }
        }
    })
    if(err){
        next(err);
        return
    }
    if(body.weight.length != body.reps.length){
        next({
            message: "sets and weight entries don't match",
            errCode: 400
        })
        return;
    }

    user = userController.getUserWithId(body.userId);
    if(!user){
        next({
            message: "You can't hang out with your friends, even when you are with them",
            errCode: 404
        })
        return;
    }

    exercise = exerciseController.getExeriseWithId(body.exerciseId);
    if(!exercise){
        next({
            message: "No exercise, wasting your time",
            errCode: 404
        });
        return;
    }
    body.id = maxId;
    maxId++;
    data.push(body);
    body.exerciseName = exercise.name;
    res.status(200).json(body);
}

//Uc-304: Change workout
exports.changeWorkout = (eq, res, next) => {

}



exports.getWorkoutById = (req, res, next) => {
    let {id} = req.params;
    number = parseInt(id);

    let workout = data.find((work) => work.id == id);
    if(!workout){
        next({
            message: "doesn't exist, i figured out what can move me",
            errCode: 404
        });
        return;
    }
    res.status(200).json(workout);
}

//Uc-305: Delete workout by Id
exports.deleteWorkoutById = (req, res, next) => {
    let {id} = req.params;
    workout = data.find((work) => work.id == id);
    if(!workout){
        next({
            message: "It's only sex",
            errCode: 404
        })
    }

    data = data.filter((workout) => workout.id != id);
    res.status(200).json(workout);
    
}