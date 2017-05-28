var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

var Course = require('../models/courses')
var User = require('../models/user')
var Teacher = require('../models/teachers');
var Questions = require('../models/questions');
var QuestionPaper = require('../models/question_papers')

var studentCourseNames= [ ];
var studentCourseIDS = [ ]; 
    
Course.find({}, function(err, course){
       if(course)
        {
            var studentCoursesArray = course;
            
            console.log(studentCoursesArray)
            for (var i=0; i<studentCoursesArray.length; i++)
            {
                studentCourseNames.push(studentCoursesArray[i].courseName.toString());
                studentCourseIDS.push(studentCoursesArray[i].courseID.toString());   
            }
        }
    }); 

//***********HIT for Generating Question Papers **************//
router.post('/', function(req, res, next) {
     
   var paper_course = req.body.course;
   var examType = req.body.examType;
   var examName = "";
   switch (examType) {
    case "1":
        examName = "Sessionals CT - 1";
        break;
    case "2":
        examName = "Sessionals CT -2";
        break;
    case "3":
        examName = "Pre-University Examination";
        break;
   }     

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}    
Questions.find({courseID: paper_course}, function(err, question){
       if(question)
        {
            var questionsArray = question;
            var question_paper_part1 = "<h4>Part - I  Attempt ALL parts.  [2*10 = 20]</h4><ol>"
            var question_paper_part2 = "<h4>Part - II  Attempt any FIVE parts.  [10*5 = 50]</h4><ol>"
            var question_paper_part3 = "<h4>Part - III  Attempt any TWO parts.  [15*2 = 30]</h4><ol>"

            console.log(questionsArray);
            var endPart1 = false;
            var endPart2 = false;
            var endPart3 = false;
            var counter1 = 1; 
            var counter2 = 1; 
            var counter3 = 1;
            
            var questionIDS = [];
            var questionDesc = [];
            var questionCO = [];
            var questionPart = [];
            
            shuffle(questionsArray);           
            for(var i=0; i<questionsArray.length; i++)
                {
                    
                    if (questionsArray[i].question_section == '1' && endPart1 != true)
                        {
                            if(counter1==11)
                                {
                                    endPart1 = true;
                                    question_paper_part1 = question_paper_part1 + "</ol>";
                                }
                            else
                            {
                            question_paper_part1 = question_paper_part1 + "<li>"+questionsArray[i].question_description+"</li>";
                            counter1++;
                            questionIDS.push(questionsArray[i]._id);
                            questionDesc.push(questionsArray[i].question_description);
                            questionCO.push(questionsArray[i].question_co);
                            questionPart.push(questionsArray[i].question_section);    
                            console.log(questionIDS);
                            }
                        }
                    else if (questionsArray[i].question_section == '2' && endPart2 != true)
                        {
                            if(counter2==9)
                                {
                                    endPart2 = true;
                                    question_paper_part2 = question_paper_part2 + "</ol>";
                                }
                            else
                            {
                                question_paper_part2 = question_paper_part2 + "<li>"+questionsArray[i].question_description+"</li>";
                                counter2++;
                                questionIDS.push(questionsArray[i]._id);
                                  questionDesc.push(questionsArray[i].question_description);
                            questionCO.push(questionsArray[i].question_co);
                            questionPart.push(questionsArray[i].question_section);  
                            }
                        }
                    else if (questionsArray[i].question_section == '3' && endPart3 != true)
                        {
                            console.log("It comes here....");
                            if(counter3==4)
                                {
                                    endPart3 = true;
                                    question_paper_part3 = question_paper_part3 + "</ol>";
                                }
                            else
                            {
                            question_paper_part3 = question_paper_part3 + "<li>"+questionsArray[i].question_description+"</li>";
                            counter3++;                    
                             questionIDS.push(questionsArray[i]._id);
                                  questionDesc.push(questionsArray[i].question_description);
                            questionCO.push(questionsArray[i].question_co);
                            questionPart.push(questionsArray[i].question_section);  
                            }
                        }
                    else
                    {
                          
                    }
                }
               var question_paper = ""+question_paper_part1+question_paper_part2+question_paper_part3;
               
                var newQuestionPaper = new QuestionPaper({examID: paper_course, examName: paper_course + " " + examName, questionID: questionIDS, questionDesc: questionDesc, questionCO: questionCO, questionPart: questionPart })
                newQuestionPaper.save(function(err){

                if ( err ) 
                {
                    throw err;
                }
                else
                {
                   req.flash('info', 'Question Paper generated successfully!')
//	               res.render('teacher_profile', { title: 'Outcome Based Education Management System',message: req.flash('info'), name: req.session.username,  studentCourseNames:  studentCourseNames,  studentCourseIDS:  studentCourseIDS  });
                   console.log("Question paper generated and recorded in database..");
                    console.log(question_paper);
                }
	           });
                //Generating Question Paper from HTML
               res.pdfFromHTML({
                 filename: 'generated.pdf',
                 htmlContent: "<html><head></head><body><div align='center'><h2>Raj Kumar Goel Institute of Technology</h2><p></p><h4>Dept. of Information Technology</h4><p></p><h4>"+examName +"</h4><h4>Paper Code:"+paper_course+"</h4></div>" +question_paper+ "<h4 align='center'>******* Best of Luck! *******</h4></body></html>"
        
               });
        }
    });    

      
});


module.exports = router;