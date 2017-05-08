var mongoose = require('mongoose');  
//var bcrypt   = require('bcrypt-nodejs');

var studentSchema = mongoose.Schema({  

    name: String,
    roll_no: String,
    fathers_name: String,
    branch: String,
    email: String,
    session: String,
    year: String,
    courses: [ String ]

});

var Students = mongoose.model('Students', studentSchema);  
module.exports = Students