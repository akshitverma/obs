var express = require('express');
var router = express.Router();
var Course = require('../models/courses')
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
var electedquestionpaperNames = [ ];
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
            questionpaperIDS = [ ];
            var questionpaperArray = questionpaper
            console.log(questionpaperArray)
            for (var i=0; i<questionpaperArray.length; i++)
            {
                //studentRolls[i] = studentArray[i].roll_no.toString();
                questionpaperNames[i] = questionpaperArray[i].examName;
                questionpaperIDS[i] = questionpaperArray[i].examID;
                
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
            //studentRolls = [ ];
            selectedquestionpaperNames = [ ];
            selectedquestionpaperCOS = [ ];
            var selectedquestionpaperArray = selectedquestionpaper
            console.log(selectedquestionpaperArray)
            for (var i=0; i<selectedquestionpaperArray.length; i++)
            {
                //studentRolls[i] = studentArray[i].roll_no.toString();
                selectedquestionpaperNames[i] = selectedquestionpaperArray[i].examName;
                selectedquestionpaperCOS[i] = selectedquestionpaperArray[i].question_co;
                
            }
        }
    }); 
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Outcome Based Education Management System', message: null});
});



//HIT for Adding Teachers Form
router.get('/addTeachersForm', function(req, res, next) {
  
  res.render('add_teachers_form.ejs', { title: 'Outcome Based Education Management System', name: req.session.username, message: "" });
});


//HIT for Adding Students Form
router.get('/addStudentsForm', function(req, res, next) {
    getCourses();            
    res.render('add_students_form.ejs', { title: 'Outcome Based Education Management System', name: req.session.username, message: "", studentCourseNames: studentCourseNames, studentCourseIDS: studentCourseIDS });
    console.log("Add Students Form Rendered!!!")
        
    }); 


//HIT for Adding Questions Form
router.get('/addQuestionsForm', function(req, res, next) {
    getCourses(); 
    console.log("Here")
    console.log(req.session.username);
  res.render('add_questions_form.ejs', { title: 'Outcome Based Education Management System', name: req.session.username, message: "", studentCourseNames: studentCourseNames, studentCourseIDS: studentCourseIDS });
});


//HIT for Generating Question Paper Form
router.get('/generateQuestionPaperForm', function(req, res, next) {
  getCourses();
  res.render('generate_questionPaper.ejs', { title: 'Outcome Based Education Management System', name: req.session.username, message: "", studentCourseNames: studentCourseNames, studentCourseIDS: studentCourseIDS });
});


//HIT for Mark students Form
router.get('/markStudentsForm', function(req, res, next) {
    getQuestionPaper();
    var studentCourseNames12 = ["1","2","3"];
    //console.log("Here")
    //console.log(req.session.username);
    
  res.render('mark_students.ejs', { title: 'Outcome Based Education Management System', name: req.session.username, message: "", questionpaper: questionpaperNames  });
//res.csv([
//    ["a", "b", "c"]
//  , ["d", "e", "f"],
//    studentCourseNames    
//  ]);
});





//HIT for Course Form
router.get('/addCoursesForm', function(req, res, next) {
  res.render('add_courses_form.ejs', { title: 'Outcome Based Education Management System', name: req.session.username, message: ""});
});

//HIT for Viewing Courses in DB
router.get('/viewCourses', function(req, res, next) {
  getCourses();
  res.render('view_courses.ejs', { title: 'Outcome Based Education Management System', name: req.session.username, message: "", studentCourseNames: studentCourseNames, studentCourseIDS: studentCourseIDS });
});


//HIT for DELETING Courses in DB
router.get('/deleteCourse', function(req, res, next) {
  // GET the course to delete
  var cid = req.query.cid;     
Course.findOneAndRemove({ courseID: cid }, function(err) {
  if (err) throw err;

  // We have deleted the course
  console.log('Course deleted!');
  //Refreshing View Courses Page
  getCourses();
  res.render('view_courses.ejs', { title: 'Outcome Based Education Management System', name: req.session.username, message: "Course Deleted Successfully!", studentCourseNames: studentCourseNames, studentCourseIDS: studentCourseIDS });    
});
});

//HIT for Viewing Students in DB
router.get('/viewStudents', function(req, res, next) {
  getStudents();
  res.render('view_students.ejs', { title: 'Outcome Based Education Management System', name: req.session.username, message: "", studentRolls: studentRolls, studentNames: studentNames });
});

//HIT for DELETING Students in DB
router.get('/deleteStudent', function(req, res, next) {
  // GET the student to delete
  var sid = req.query.sid;     
Student.findOneAndRemove({ roll_no: sid }, function(err) {
  if (err) throw err;

  // We have deleted the course
  console.log('Student deleted!');
  //Refreshing View Courses Page
  getCourses();
  res.render('view_students.ejs', { title: 'Outcome Based Education Management System', name: req.session.username, message: "Student Deleted Successfully!", studentNames: studentNames, studentRolls: studentRolls });    
});
});

//HIT for Logout
router.get('/logout', function(req, res, next) {
    req.session.username = "";
            req.flash('info', 'You are now logged out.');
             console.log('Invalid');
             res.render('index', { message: req.flash('info'), title: "Outcome Based Education Management System"  });
});

module.exports = router;


//4098000100065504  PUNB0409800