var express = require('express');
var router = express.Router();
var Course = require('../models/courses')

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
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Outcome Based Education Management System', message: null});
});




router.get('/addTeachersForm', function(req, res, next) {
  
  res.render('add_teachers_form.ejs', { title: 'Outcome Based Education Management System', name: req.session.username, message: "" });
});

router.get('/addStudentsForm', function(req, res, next) {
            
            res.render('add_students_form.ejs', { title: 'Outcome Based Education Management System', name: req.session.username, message: "", studentCourseNames: studentCourseNames, studentCourseIDS: studentCourseIDS });
            console.log("Add Students Form Rendered!!!")
        
    }); 

router.get('/addQuestionsForm', function(req, res, next) {
 
    console.log("Here")
    console.log(req.session.username);
  res.render('add_questions_form.ejs', { title: 'Outcome Based Education Management System', name: req.session.username, message: "", studentCourseNames: studentCourseNames, studentCourseIDS: studentCourseIDS });
});


router.get('/generateQuestionPaperForm', function(req, res, next) {
 
  res.render('generate_questionPaper.ejs', { title: 'Outcome Based Education Management System', name: req.session.username, message: "", studentCourseNames: studentCourseNames, studentCourseIDS: studentCourseIDS });
});


router.get('/addCoursesForm', function(req, res, next) {
  res.render('add_courses_form.ejs', { title: 'Outcome Based Education Management System', name: req.session.username, message: ""});
});

router.get('/logout', function(req, res, next) {
    req.session.username = "";
            req.flash('info', 'You are now logged out.');
             console.log('Invalid');
             res.render('index', { message: req.flash('info'), title: "Outcome Based Education Management System"  });
});

module.exports = router;


//4098000100065504  PUNB0409800