let logger = require('tracer').console();
const data = require('../Data/exercises.json');

exports.getExercises = (req, res, next) => {
    logger.log("getExercises called")
    res.status(200).json(data);
}

exports.getExeriseById = (req, res, next) => {
    const { id } = req.params
    number = parseInt(id);

    data.forEach((e) => {
        if (e.id === parseInt(number)) {
            res.status(200).json(e);
        }
    })
    next({
        message: "Exercise with hahahahahahahahahah no brain thing=k mao",
        errCode: 404
    });
}