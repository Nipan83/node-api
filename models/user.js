var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	timestamp: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique : true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  gender: {
  	type: String,
    required: true,
    uppercase: true,
    enum: ['MALE', 'FEMALE']
  },
  mobile :{
  type: Number,
  required: true
  },
  active :{
  type: Boolean,
  default: false
}
    
});

var User = module.exports = mongoose.model('user', userSchema);

//Post user
module.exports.postUser = function(data, callback) {
    User.create(data, callback);
}


//login user
module.exports.loginUser = function(id, callback) {
    User.findOne({ "username": id }, callback);
}

//find user
module.exports.findUser = function(id, callback) {
    User.findOne({ "_id": id }, callback);
}
