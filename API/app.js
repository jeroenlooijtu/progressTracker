const express = require("express");
const app = express();
const port = 3000;
let logger = require('tracer').console()

const bodyparser = require("body-parser");

app.get('/', (req, res) => {
    res.send("Hello worls");
});

app.use(bodyparser.json());

require("./Routes/exercise.routes.js")(app);

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.use((error, req, res, next) => {
    logger.log("Errorhandler called!", error);
    res.status(error.errCode).json({
        error: "An error happened",
        message: error.message
    });
});

module.exports = app;