var mongoose = require('mongoose');  
//var bcrypt   = require('bcrypt-nodejs');

var examSchema = mongoose.Schema({  
  local: {
    exam_name: String,
    subjects: [{
        
        subject_id: String,
        subject_name: String,
        questions: [{
            
            question_no: String,
            question_description: String,
            total_marks: String,
            marks_scored: String,
            question_co: String
        }]
        ,
       
    }]
  },
});

//userSchema.methods.generateHash = function(password) {  
//  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//};
//userSchema.methods.validPassword = function(password) {  
//  return bcrypt.compareSync(password, this.local.password);
//};
module.exports = mongoose.model('User', userSchema);  