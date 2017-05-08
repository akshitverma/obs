var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

var Course = require('../models/courses')
var User = require('../models/user')
var Teacher = require('../models/teachers');
var Questions = require('../models/questions');

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

//***********HIT for Adding Questions **************//
router.post('/', function(req, res, next) {
     
    var exam_type = req.body.examType
    var question_description = req.body.questionDescription
    var question_co = req.body.co
    var question_section = req.body.questionSection
    var questionCourseID = req.body.course

    var newQuestion = new Questions({exam_type: exam_type, question_description: question_description, question_co: question_co, question_section: question_section, courseID: questionCourseID});
    
    newQuestion.save(function(err){

    if ( err ) 
      {
          throw err;
      }
    else
       {
          req.flash('info', 'Question added successfully!')
	      res.render('teacher_profile', { title: 'Outcome Based Education Management System',message: req.flash('info'), name: req.session.username, studentCourseNames: studentCourseNames, studentCourseIDS: studentCourseIDS  });
          console.log("Question Added Successfully");
       }
	});
   
    

    });


module.exports = router;