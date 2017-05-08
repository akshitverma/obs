var mongoose = require('mongoose');  
//var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({  

    name: String,
    username: String,
    password: String


});

var User = mongoose.model('User', userSchema);

module.exports = User  