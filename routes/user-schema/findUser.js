var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var config = require('../../config');
var bcrypt = require('bcryptjs');
var User = require('../../models/user');


/*
    Route for getting details of the user available
    
    Authentication is handled using JWT.

   
*/
router.get('/', function(req, res, next) {

    var token = req.headers['x-access-token'];
    console.log(token);
    var cookieToken = req.cookies.token;
    if(!cookieToken){
        return res.status(401).json({
             auth: false,
             message: 'Login Again!',
             token: null
         });
    }

     if (!token)
         return res.status(401).json({
             auth: false,
             message: 'No token available.'
         });

     jwt.verify(token, config.secret, function(err, decoded) {

        console.log(decoded);
        if (err)
            return res.status(500).json({
                auth: false,
                message: 'Failed to authenticate token.'
            });
        var id = decoded.id;
        User.findUser(id,function(err, userData) {
            if (err)
                return res.status(500).send("There was a problem finding the user.");
            

            res.json({active: userData.active,
                timestamp: userData.timestamp,
                username: userData.username,
                email: userData.email,
                firstname: userData.firstname,
                lastname: userData.lastname,
                gender: userData.gender,
                mobile: userData.mobile});
        })
    });
});

module.exports = router;