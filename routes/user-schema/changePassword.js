var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config');
var User = require('../../models/user');




router.post('/', function(req, res, next) {

  
  

    
  if(!req.body.email){return res.status(404).json('email is not given');}
  if(!req.body.newPassword){return res.status(404).json('new password is not given');}
  var hashedPassword = bcrypt.hashSync(req.body.newPassword, 8);
  var token = req.headers['x-access-token'];
  var email = req.body.email;
  var newPassword = req.body.newPassword;

   if (!token)
         return res.status(401).json({
             auth: false,
             message: 'No token available.'
         });


    jwt.verify(token, config.secret, function(err, decoded) {
      if (err)
            return res.status(500).json({
                auth: false,
                message: 'Failed to authenticate token.'
            });

    User.findUser(decoded.id, function(err, user) {

    if (err) return res.status(500).send('Error on the server.');

    if (!user) return res.status(404).send('No user found.');
    User.update({_id: user._id}, {
        password: hashedPassword
                    }, 
          function(err, affected, resp) {
          
                  });
    

    res.status(200).send({ auth: true, token: token, message: "Password changed successfully! Login Again"});
  });

 });
  
});




module.exports = router;