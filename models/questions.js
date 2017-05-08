var mongoose = require('mongoose');  


var questionSchema = mongoose.Schema({  
  
    courseID: String,
    exam_type: String,
    question_description: String,
    question_co: String,
    question_section: String
});

var Questions = mongoose.model('Questions', questionSchema);  

module.exports = Questions