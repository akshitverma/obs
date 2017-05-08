var mongoose = require('mongoose');  


var questionPaperSchema = mongoose.Schema({  
  
    questionID: [String]
    
});

var QuestionPaper = mongoose.model('QuestionPaper', questionPaperSchema);  

module.exports = QuestionPaper