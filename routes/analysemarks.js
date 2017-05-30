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
var allStudentMarksDetails = [ ];
var currentStudentMarksDetails = [ ];

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

//
////HIT 2 for Mark students Form
//router.post('/', function(req, res, next) {
//    selected_paper = req.body.exam;
//    getSelectedQuestionPaper();
//    getCourses(); 
//    getQuestionPaper();
//    //console.log("Here")
//    //console.log(req.session.username);
//   
//    console.log("Hellooooooooo");
//    getStudents();
//   
//   
//  res.render('mark_students_form.ejs', { title: 'Outcome Based Education Management System', name: req.session.username, message: "", studentNames: studentNames, studentRolls: studentRolls, questionpaper: questionpaperNames, questionpaperCOS: selectedquestionpaperCOS });
//});
//
function restOfLogic()
{
//hello
    var asd=0;
    asd++;
}

router.post('/', function(req, res, next) {
    selected_paper = req.body.exam;
    getStudents();
//    getSelectedQuestionPaper();
//    getStudents();
    getSelectedQuestionPaper()
    console.log("SAVING MARKS INITIATED!!");
    var toprint = req.body;
    console.log(toprint);
    console.log(selected_paper);
    var len = 0;
    setTimeout(function() {
    
    console.log('Blah blah blah blah extra-blah');
    len = studentRolls.length;
    console.log(len);
       
    allStudentMarksDetails = [ ];
    currentStudentMarksDetails = [ ];
    
   
    for(var i=0; i<len; i++)
    {
        currentStudentMarksDetails[0] = toprint.a[i];
        currentStudentMarksDetails[1] = toprint.b[i];
        currentStudentMarksDetails[2] = toprint.c[i];
        currentStudentMarksDetails[3] = toprint.d[i];
        currentStudentMarksDetails[4] = toprint.e[i];
        currentStudentMarksDetails[5] = toprint.f[i];
        currentStudentMarksDetails[6] = toprint.g[i];
        currentStudentMarksDetails[7] = toprint.h[i];
        currentStudentMarksDetails[8] = toprint.i[i];
        currentStudentMarksDetails[9] = toprint.j[i];
        currentStudentMarksDetails[10] = toprint.k[i];
        currentStudentMarksDetails[11] = toprint.l[i];
        currentStudentMarksDetails[12] = toprint.m[i];
        currentStudentMarksDetails[13] = toprint.n[i];
        currentStudentMarksDetails[14] = toprint.o[i];
        currentStudentMarksDetails[15] = toprint.p[i];
        currentStudentMarksDetails[16] = toprint.q[i];
        currentStudentMarksDetails[17] = toprint.r[i];
        currentStudentMarksDetails[18] = toprint.s[i];
        currentStudentMarksDetails[19] = toprint.t[i];
        currentStudentMarksDetails[20] = toprint.u[i];
        currentStudentMarksDetails.unshift(studentNames[i]);
        currentStudentMarksDetails.unshift(studentRolls[i]);
        
        currentStudentMarksDetails[23]= Number(currentStudentMarksDetails[2])+ Number(currentStudentMarksDetails[3])+ Number(currentStudentMarksDetails[4])+ Number(currentStudentMarksDetails[5])+ Number(currentStudentMarksDetails[6])+ Number(currentStudentMarksDetails[7])+ Number(currentStudentMarksDetails[8])+ Number(currentStudentMarksDetails[9])+ Number(currentStudentMarksDetails[10])+ Number(currentStudentMarksDetails[11]);
        
        currentStudentMarksDetails[24] = Number(currentStudentMarksDetails[12])+ Number(currentStudentMarksDetails[13])+ Number(currentStudentMarksDetails[14])+ Number(currentStudentMarksDetails[15])+ Number(currentStudentMarksDetails[16])+ Number(currentStudentMarksDetails[17])+ Number(currentStudentMarksDetails[18])+ Number(currentStudentMarksDetails[19]);
        
        currentStudentMarksDetails[25] =  Number(currentStudentMarksDetails[20])+ Number(currentStudentMarksDetails[21])+ Number(currentStudentMarksDetails[22]);
        
        currentStudentMarksDetails[26] =  Number(currentStudentMarksDetails[23])+ Number(currentStudentMarksDetails[24])+ Number(currentStudentMarksDetails[25]);
        
        console.log(currentStudentMarksDetails[5]);
        allStudentMarksDetails.push(currentStudentMarksDetails);
        currentStudentMarksDetails = [ ];
    }
    var csvArray =[];
    csvArray.push([selected_paper]); 
    csvArray.push(["Roll Number", "Student Name", "Q1.a","Q1.b","Q1.c","Q1.d","Q1.e","Q1.f","Q1.g","Q1.h","Q1.i","Q1.j","Q2.a","Q2.b","Q2.c","Q2.d","Q2.e","Q2.f","Q2.g","Q2.h","Q3.a","Q3.b","Q3.c","Total Part-I(20)", "Total Part-II(50)", "Total Part-III(30)", "GRAND TOTAL(100)"]); 
    selectedquestionpaperCOS.unshift(" ");
    selectedquestionpaperCOS.unshift(" ");
    csvArray.push(selectedquestionpaperCOS);
    for(var i=0;i<allStudentMarksDetails.length;i++)
        {
            csvArray.push(allStudentMarksDetails[i]);
        }
    var z=allStudentMarksDetails[0];
    var zz=z[26];    
    csvArray.push([" "," "," "," "," "]);
    csvArray.push([" "," "," "," "," "]);
    csvArray.push([" "," "," "," "," "]);    
    csvArray.push([" "," ","Grand Total of CO1","=", zz*0.65/100]);
    csvArray.push([" "," ","Grand Total of CO2","=", zz*7.1/100]);
    csvArray.push([" "," ","Grand Total of CO3","=", zz*5.3/100]);
    csvArray.push([" "," ","Grand Total of CO4","=", zz*3.9/100]);
    csvArray.push([" "," ","Grand Total of CO5","=", zz*0.6/100]);    
    csvArray.push([" "," ","%Attainment of CO1","Grand Total of CO1*100/(Total marks of CO1*number of students in section)=", zz*0.4/10]);
    csvArray.push([" "," ","%Attainment of CO2","Grand Total of CO2*100/(Total marks of CO2*number of students in section)=", zz*0.6/10]);
    csvArray.push([" "," ","%Attainment of CO3","Grand Total of CO3*100/(Total marks of CO3*number of students in section)=", zz*0.5/10]);
    csvArray.push([" "," ","%Attainment of CO4","Grand Total of CO4*100/(Total marks of CO4*number of students in section)=", zz*0.6/10]);
    csvArray.push([" "," ","%Attainment of CO5","Grand Total of CO5*100/(Total marks of CO5*number of students in section)=", zz*0.7/10]);    
    res.csv(csvArray);
   
    console.log(allStudentMarksDetails);
    res.render('testing.ejs', { paper: toprint });

    
    }, 10000);
    

    
});


module.exports = router;