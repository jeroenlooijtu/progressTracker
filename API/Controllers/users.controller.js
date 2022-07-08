let logger = require('tracer').console();
let data = require('../Data/Users.json');
let maxId = 3;
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken');
let jwtSecretKey = "LKetamine";


//Uc-401: create user
exports.createUser = async(req, res, next) => {
    let {body} = req;
    let keys = Object.keys(data[0]);
    keys = keys.filter((key) => key != "Id");
    let bodykeys = Object.keys(body);
    if(bodykeys.length != keys.length){ //Checking if body has the right amount of keys, so a body with excess keys won't be added to the data
        next({
            message: "Day by day, it won't leave",
            errCode: 400
        })
        return;
    }
    let err;
    keys.forEach((e) => {
        logger.log(e)  
        if(!body[e]){
            err = {
                message: "Every time, i try to speak",
                errCode: 400
            }
        }
    });
    if(err){
        next(err);
        return;
    }
    let user = body;
    user.Id = maxId;
    maxId++;
    user.Password = await bcrypt.hash(body.Password, 10);
    data.push(user);
    res.status(200).json(user);
}

//Uc-402: Change user
exports.changeUser = (req,res, next) => {

}

//Uc-403: Get all users
exports.getAllUsers = (req, res, next) => { 

}

//Uc-404: get user by id
exports.getUserById = (req, res, next) => {
    let {id} = req.params
    user = data.find((us) => us.Id == id)
    if(!user){
        next({
            message: "Hey space cadet, the user you're looking for seems to not exist",
            errCode: 404
        });
        return
    }
    res.status(200).json(user)
}

exports.getUserWithId = (Id) => {
    return data.find((u) => u.Id == Id)
}

//Uc-405: get user by username
exports.getUserByName = (req, res, next) => {

}

//Uc-406: get user by email
exports.getUserByEmail = (req,res, next) => { 

}

//Uc-407: delete user by email
exports.deleteUser = (req, res, next) => {

}

//Uc-408: login user
exports.login = async (req, res, next) => {
    let {body} = req;
    let keys = ["Name", "Password"]
    let err;
    keys.forEach((key) => {
        if(!body[key]){
            err = {
                message: "I feel alone, all the time",
                errCode: 400
            }
        }
    });
    if(err){
        next(err);
        return;
    }

    let userName = body.Name;
    let password = body.Password;
    user = data.find((us) => us.Name == userName)
    if(!user){
        next({
            message: "and when you hold his hands, it doesn't feel like flying", //please bore me to death
            errCode: 400
        });
        return;
    }
    let logic = await bcrypt.compare(password, user.Password);
    logger.log(logic);
    if(!logic){
        next({
            message: "And when you take his breathe away, he might as well be dying", //please bore me to death
            errCode: 400
        });
        return;
    }
    const payload = {
        "Id": user.Id
    };
    token = jwt.sign(payload, jwtSecretKey, {expiresIn: "2h"})


    res.status(200).json(token)
}

//Uc-409: validate token
exports.validateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        next({
            message: "No authorization given",
            errCode: 401
        })
        return;
    }

    jwt.verify(token, jwtSecretKey, (err, payload) => {
        if(err){
            next({
                message: "it's getting late, i shoud go to bed",
                errCode: 401
            });
            return
        }
        req.body.userId = payload.Id
        next();
    })
}