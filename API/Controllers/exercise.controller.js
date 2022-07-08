let logger = require('tracer').console();
let data = require('../Data/exercises.json');
let maxId = 6;


//Uc-201: get exercises
exports.getExercises = (req, res, next) => {
    logger.log("getExercises called")
    res.status(200).json(data);
}

//Uc-202: get exercises by id   
exports.getExeriseById = (req, res, next) => {
    const { id } = req.params
    number = parseInt(id);
    let obj;
    exercise = data.find((ex) => ex.id == id);
    if(!exercise){
        logger.error("User is not admin of this house");
        next({
            message : "User is not admin of this home",
            errCode : 401
        });
        return
    }

    res.status(200).json(exercise);
};

//Uc-203: Change exercise

exports.changeExercise = (req, res, next) => {

}

//Uc-204: Create exercise
exports.addExercise = (req, res, next) => {
    let {body} = req;
    let keys = Object.keys(data[1]);
    keys = keys.filter((key) => key !== "id");
    logger.log(keys);
    keys.forEach((key) => {
        if(!body[key]){
            logger.log(key)
            let err = {message: "wrong body format",
                        errCode: 400}
            next(err);
            return;
        }
    })
    body.id = maxId;
    maxId++;
    data.push(body)
    res.status(200).json(body);

}

//Uc-205: delete exercise
exports.deleteExcercise = (req, res, next) => { 

}

exports.getExeriseWithId = (id) => {
    logger.log("here's the issue ya dingus")
    exercise = data.find((ex) => ex.id == id);
    return exercise;
}