var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

var User = require('../models/user')
var Course = require('../models/courses');
var Student = require('../models/students')

var csv = require('express-csv')
var QuestionPaper = require('../models/question_papers')

var studentCourseNames= [ ];
var studentCourseIDS = [ ]; 
var studentRolls = [ ];
var studentNames =[ ];
var questionpaperNames = [ ];
var questionpaperIDS = [ ];
var questionpaperCOS = [ ];
var selected_paper = "";
var selectedquestionpaperNames = [ ];
var selectedquestionpaperCOS = [ ];

function getCourses() 
{
Course.find({}, function(err, course){
       if(course)
        {
            var studentCoursesArray = course;
            studentCourseIDS =[ ];
            studentCourseNames =[ ];
            console.log(studentCoursesArray)
            for (var i=0; i<studentCoursesArray.length; i++)
            {
                studentCourseNames[i] = studentCoursesArray[i].courseName.toString();
                studentCourseIDS[i] = studentCoursesArray[i].courseID.toString();  
                console.log("Added!");
            }
        }
    }); 
}
/* Function for Getting Students */
function getStudents() 
{
Student.find({}, function(err, student){
       if(student)
        {
            studentRolls = [ ];
            studentNames =[ ];
            var studentArray = student
            console.log(studentArray)
            for (var i=0; i<studentArray.length; i++)
            {
                studentRolls[i] = studentArray[i].roll_no.toString();
                studentNames[i] = studentArray[i].name.toString();  
            }
        }
    }); 
}

/* Function for Getting Question Paper*/
function getQuestionPaper() 
{
QuestionPaper.find({}, function(err, questionpaper){
       if(questionpaper)
        {
            //studentRolls = [ ];
            questionpaperNames = [ ];
//            questionpaperIDS = [ ];
            var questionpaperArray = questionpaper
            console.log(questionpaperArray)
            for (var i=0; i<questionpaperArray.length; i++)
            {
                //studentRolls[i] = studentArray[i].roll_no.toString();
                questionpaperNames[i] = questionpaperArray[i].examName;
//                questionpaperIDS[i] = questionpaperArray[i].examID;
                
            }
        }
    }); 
}

/* Function for Getting Selected Question Paper Details */
function getSelectedQuestionPaper() 
{

QuestionPaper.find({ examName: selected_paper }, function(err, selectedquestionpaper){
       if(selectedquestionpaper)
        {
           
            selectedquestionpaperCOS = [ ];
            var selectedquestionpaperArray = selectedquestionpaper
           // console.log(selectedquestionpaperArray)
           // for (var i=0; i<selectedquestionpaper.question_co.length; i++)
            console.log("testing here");
                //studentRolls[i] = studentArray[i].roll_no.toString();
                //selectedquestionpaperNames[i] = selectedquestionpaperArray[i].examName;
                selectedquestionpaperCOS = selectedquestionpaper[0].questionCO;
            console.log("here is error");
            console.log(selectedquestionpaperCOS);
                
        
        }
    }); 
}


//HIT 2 for Mark students Form
router.post('/', function(req, res, next) {
    selected_paper = req.body.exam;
    getSelectedQuestionPaper();
    getCourses(); 
    getQuestionPaper();
    //console.log("Here")
    //console.log(req.session.username);
   
    console.log("Hellooooooooo");
    getStudents();
   
   
  res.render('mark_students_form.ejs', { title: 'Outcome Based Education Management System', name: req.session.username, message: "", studentNames: studentNames, studentRolls: studentRolls, questionpaper: questionpaperNames, questionpaperCOS: selectedquestionpaperCOS });
});


//router.post('/savemarks', function(req, res, next) {
//    console.log("SAVING MARKS INITIATED!!");
//
//    var inp = "1q1303313008"
//    selected_paper = req.body.exam;
//    var toprint = req.body.inp;
//    console.log(toprint);
//    //    getSelectedQuestionPaper();
//    // getCourses(); 
//    //getQuestionPaper();
//    //console.log("Here")
//    //console.log(req.session.username);
//    
//        //getStudents();
//   
//   
//    res.render('testing.ejs', { });
//});


module.exports = router;