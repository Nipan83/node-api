var express = require('express');
const bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
var router = express.Router();
var config = require('../../config');
var bcrypt = require('bcryptjs');
var User = require('../../models/user');

router.use(bodyParser.urlencoded({
    extended: true
}));

/*
    Post Route for login
    Token will be generated here
*/

router.post('/', function(req, res) {
     var username = req.body.username;
    if(!req.body.password){return res.status(404).json('password is not given');}
    if(!req.body.username){return res.status(404).json('username is not given');}


    User.loginUser(username, function(err, user) {

    if (err) return res.status(500).send('Error on the server.');

    if (!user) return res.status(404).send('No user found.');

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, message:"wrong password" });

    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 864000 // expires in 10 days
    });
    res.cookie('token', token);

    res.status(200).send({ auth: true, token: token, message: "successfully logged in!"});
  });
});

module.exports = router;