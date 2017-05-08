var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

var User = require('../models/user')
var Course = require('../models/courses');
var Student = require('../models/students')

//***********HIT for Adding Courses**************
router.post('/', function(req, res, next) {
    
    var studentRollNo = req.body.rollNumber;
    var studentName = req.body.name;
    var studentFather = req.body.fathersName;
    var studentEmail = req.body.email;
    var studentSession = req.body.session;
    var studentBranch = req.body.branch;
    var studentYear = req.body.year;
    
    var studentCourseId = req.body.studentSubjects;
    var courses = [ ];
    console.log(studentCourseId);
    
    console.log("new here..");
   
    var newStudent = new Student({roll_no: studentRollNo, name: studentName, fathers_name: studentFather, email: studentEmail, session: studentSession, branch: studentBranch, year: studentYear, courses: studentCourseId });

    
    newStudent.save(function(err){

    if ( err ) 
      {
          throw err;
      }
    else
       {
          req.flash('info', 'Student added successfully!')
	      res.render('admin_profile', { title: 'Outcome Based Education Management System',message: req.flash('info'), name: req.session.username  });
          console.log("Student Added Successfully");
       }
	});
    console.log("here...??");   
    console.log(studentCourseId);
    });

module.exports = router;