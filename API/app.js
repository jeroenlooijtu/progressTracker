const express = require("express");
const app = express();
const port = 3000;
let logger = require('tracer').console()

const bodyparser = require("body-parser");

app.get('/', (req, res) => {
    res.send("Hello worls");
});

app.use(bodyparser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



require("./Routes/exercise.routes.js")(app);
require("./Routes/workout.routes.js")(app);
require("./Routes/users.routes.js")(app);

app.use((err, req, res, next) => {
    logger.log("Errorhandler called!", err);
    res.status(err.errCode).json({
        error: "something went wrong idiot, baka, stupid, nightmare",
        message: err.message,
    });
});

module.exports = app;