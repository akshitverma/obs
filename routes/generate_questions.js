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

Questions.find({courseID: paper_course}, function(err, question){
       if(question)
        {
            var questionsArray = question;
            var question_paper_part1 = "<p>Part -I  Attempt all parts.  [2*10 = 20]</p><ol>"
            var question_paper_part2 = "<p>Part -II  Attempt any four parts.  [5*4 = 20]</p><ol>"
            var question_paper_part3 = "<p>Part -III  Attempt any two parts.  [2*10 = 20]</p><ol>"

            console.log(questionsArray);
            var endPart1 = false;
            var endPart2 = false;
            var endPart3 = false;
            var counter1 = 1; 
            var counter2 = 1; 
            var counter3 = 1;
            var questionIDS = [];
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
                            console.log(questionIDS);
                            }
                        }
                    else if (questionsArray[i].question_section == '2' && endPart2 != true)
                        {
                            if(counter2==6)
                                {
                                    endPart2 = true;
                                    question_paper_part2 = question_paper_part2 + "</ol>";
                                }
                            else
                            {
                                question_paper_part2 = question_paper_part2 + "<li>"+questionsArray[i].question_description+"</li>";
                                counter2++;
                                questionIDS.push(questionsArray[i]._id);
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
                            }
                        }
                    else
                    {
                          
                    }
                }
               var question_paper = ""+question_paper_part1+question_paper_part2+question_paper_part3;
               
                var newQuestionPaper = new QuestionPaper({questionID: questionIDS})
                newQuestionPaper.save(function(err){

                if ( err ) 
                {
                    throw err;
                }
                else
                {
                   req.flash('info', 'Question Paper generated successfully!')
	               res.render('teacher_profile', { title: 'Outcome Based Education Management System',message: req.flash('info'), name: req.session.username,  studentCourseNames:  studentCourseNames,  studentCourseIDS:  studentCourseIDS  });
                   console.log("Question paper generated and recorded in database..");
                }
	           });
                //Generating Question Paper from HTML
               res.pdfFromHTML({
                 filename: 'generated.pdf',
                 htmlContent: "<html><head></head><body><div align='center'><h2>Raj Kumar Goel Institute of Technology</h2><p></p><h4>Dept. of Information Technology</h4><p></p><h4>"+examName +"  Paper Code:"+paper_course+"</h4></div>" +question_paper+ "</body></html>"
        
               });
        }
    });    

      
});


module.exports = router;