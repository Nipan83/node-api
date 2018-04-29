var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config');
var User = require('../../models/user');

/* POST route to register user in the app. */

router.post('/', function(req, res, next) {
    
  if(!req.body.email || !req.body.username || !req.body.password || !req.body.firstname || !req.body.lastname
    || !req.body.gender || !req.body.mobile){
    return res.status(401).json({
             message: 'All field required!'
         });
  }

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  User.findOne({email: req.body.email},function(err,user){
      if(!user){

        User.create({
    username : req.body.username,
    email : req.body.email,
    password : hashedPassword,
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    gender : req.body.gender,
    mobile : req.body.mobile,
    active : "true"
  },
  function (err, user) {
    console.log(user);

    if (err) return res.json({message:err.message});
        

    res.status(200).json({message: "successfully registered!" });

  }); 

      }
      if(user){
        return res.status(401).json({
             
             message: 'email-id already exists!'
         });
      }

  });
  
  
});




module.exports = router;