var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

var User = require('../models/user')
var Course = require('../models/courses');

//***********HIT for Adding Courses**************
router.post('/', function(req, res, next) {
     
    var courseName = req.body.name;
    var courseID = req.body.paper_code;
    var co1 = req.body.co1;
    var co2 = req.body.co2;
    var co3 = req.body.co3;
    var co4 = req.body.co4;
    var co5 = req.body.co5;
     
    
    //var newTeacher = new Teacher({name: name, username: username, password: password, email: email});
    
    var newCourse = new Course({courseName: courseName, courseID: courseID, co1: co1, co2: co2, co3: co3, co4: co4, co5: co5});
   
    newCourse.save(function(err){

    if ( err ) 
      {
          throw err;
      }
    else
       {
          req.flash('info', 'Course added successfully!')
	      res.render('admin_profile', { title: 'Outcome Based Education Management System',message: req.flash('info'), name: req.body.username  });
          console.log("Course Added Successfully");
       }
	});
    });

module.exports = router;