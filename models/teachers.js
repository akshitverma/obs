var mongoose = require('mongoose');  
//var bcrypt   = require('bcrypt-nodejs');

var teacherSchema = mongoose.Schema({  

    name: String,
//    emp_no: String,
    username: String,
  //  subjects: [{subject_id: String}]
    password: String,
    
    email: String
});

var Teacher = mongoose.model('Teacher', teacherSchema);  
module.exports = Teacher