let logger = require('tracer').console();
const data = require('../Data/exercises.json');

exports.getExercises = (req, res, next) => {
    logger.log("getExercises called")
    logger.log(res.getHeaders())
    res.status(200).json(data);
}