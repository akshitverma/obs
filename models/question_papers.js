var mongoose = require('mongoose');  


var questionPaperSchema = mongoose.Schema({  
  
    examID: String,
    examName: String,
    questionID: [String],
    questionDesc: [String],
    questionCO: [String],
    questionPart: [String]
    
});

var QuestionPaper = mongoose.model('QuestionPaper', questionPaperSchema);  

module.exports = QuestionPaper