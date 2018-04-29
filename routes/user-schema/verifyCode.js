var express = require('express');
const bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
var router = express.Router();
var config = require('../../config');
var bcrypt = require('bcryptjs');
var User = require('../../models/user');


router.post('/', function(req, res) {

    var email = req.body.email;
    var code = req.body.code;
    

    if(!req.body.email){return res.status(404).json('email is not given');}
    if(!req.body.code){return res.status(404).json('verification code is not given');}

    var cookieCode = req.cookies.code;
    console.log(cookieCode);
    console.log(code);
    if(cookieCode!=code){
        return res.status(401).json({
             message: 'Unvalid Code!'
         });
    }


    User.loginUserByEmail(email, function(err, user) {

    if (err) return res.status(500).send('Error on the server.');

    if (!user) return res.status(404).send('No user found.');

    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 864000 // expires in 10 days
    });
    res.cookie('token', token);

    res.status(200).send({ auth: true, token: token, message: "Token Generated! Change your password and Login Again"});
  });
});

module.exports = router;