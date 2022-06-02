let logger = require('tracer').console();
const data = require('../Data/exercises.json');

exports.getExercises = (req, res, next) => {
    logger.log("getExercises called")
    logger.log(res.getHeaders())
    res.status(200).json(data);
}

exports.getExeriseById = (req, res, next) => {
    const {id} = req.params
    number = parseInt(id);
    logger.log(number);

    data.forEach((e) => {
        logger.log(e.id);
        if(e.id === parseInt(number)){
            res.status(200).json(e);
        }
    })
    next({
        message: "Exercise with hahahahahahahahahah no brain thing=k mao",
        errCode: 404
    });
}