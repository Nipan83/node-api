var express = require('express');
const bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var router = express.Router();
var config = require('../../config');
var bcrypt = require('bcryptjs');
var User = require('../../models/user');


router.post('/', function(req, res) {
    var email = req.body.email;
	if(!req.body.email){return res.status(404).json('email is not given');}

	var code =  Math.floor(100000 + Math.random() * 900000);
	res.cookie('code', code);
	console.log(req.cookies.code);
	

	var transporter = nodemailer.createTransport({
							service: 'gmail',
							auth: {
								user: config.mail.email,
								pass: config.mail.password
							}
						});
	var mailOptions = {
						to: 'nipandas83@gmail.com',
						from: 'nipandas83@gmail.com',
						subject: 'Verify Your account!',
						text: 'You\'re on your way! Let\'s confirm your email address\n\n' + 
						code+' is your verification code.' + '\n\n' +
						'If you did not request this, please ignore this email\n'
			   	       };

	transporter.sendMail(mailOptions, function(err, info) {
					if (err) {
							console.log('Unable to send email '+err);
							}
					 else {
							console.log(info);
							res.json({message:"An e-mail has been sent to " + email + " with further instructions! Kindly Check your spam also!",
									});
							
						}
							
			});
});

module.exports = router;
