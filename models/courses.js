var mongoose = require('mongoose');  
//var bcrypt   = require('bcrypt-nodejs');

var courseSchema = mongoose.Schema({  

    courseName: String,
//    emp_no: String,
    courseID: String,
  //  subjects: [{subject_id: String}]
    co1: String,
    
    co2: String,
    co3: String,
    
    co4: String,
    co5: String
    
});

var Courses = mongoose.model('Courses', courseSchema);  
module.exports = Courses