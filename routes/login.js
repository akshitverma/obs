var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var User = require('../models/user');
var Course = require('../models/courses')

/* FOR Login Controller. */
router.post('/', function(req, res, next) {
    var password = req.body.password
    var username = req.body.username
    var account_type = req.body.type
    
       User.find({username: req.body.username}, function(err, user){
        if(err) 
        {
            console.log(err);
        }
        else if(user && user[0])
        {
            //var temp = new User(user);
            console.log(user[0].username)
            console.log(username)
            console.log(user[0].password)
            console.log(password)
        if (user[0].username == username && user[0].password == password)
        {
            if(account_type == "1")
            {
              req.session.username = user[0].username;
              //console.log(req.session.username);    
              req.flash('info', 'Login Successfull! Welcome!!'); 
              res.render('admin_profile', { title: 'Outcome Based Education Management System',message: req.flash('info'), name: req.body.username  });
             
            
            }
            else
            {
                //Setting Sessions
                 req.session.username = user[0].username;
                //Courses form db here...
                 var studentCourseNames= [ ];
                 var studentCourseIDS = [ ]; 
                Course.find({}, function(err, course){
                if(err) 
                {
                    console.log(err);
                }
                else if(course)
                {
                    var studentCoursesArray = course;
    
                    console.log(studentCoursesArray)
            for (var i=0; i<studentCoursesArray.length; i++)
            {
                console.log(studentCoursesArray[i].courseName.toString());
                console.log(studentCoursesArray[i].courseID.toString());
                studentCourseNames.push(studentCoursesArray[i].courseName.toString());
                studentCourseIDS.push(studentCoursesArray[i].courseID.toString());
                console.log(studentCourseNames);
                console.log(studentCourseIDS);
                
            }
              req.flash('info', 'Login via Teacher Successfull!')
               res.render('teacher_profile', { title: 'Outcome Based Education Management System', message: req.flash('info'), name: req.body.username, studentCourseIDS: studentCourseIDS, studentCourseNames: studentCourseNames });
                 console.log("Teacher Profile Rendered!!!")
        }
         else 
        {
            console.log('Invalid');
             res.render('error', { message: 'Wrong Choice', error: "Error happened.."  });
        }
    }); 
                //This db ends here....
//               req.flash('info', 'Login via Teacher SuccessFull!')
//               res.render('teacher_profile', { title: 'Outcome Based Education Management System', message: req.flash('info'), name: req.body.username, studentCourseIDS: id, studentCourseNames: name  });
     
            }
        }
        else
            {
                 req.flash('info', 'Wrong Credentials')
                 console.log("Code fata.. wrong credentials")
                 res.render('error', { message: 'Wrong Cedentials..', error: "Error happened.."  });
            }
        }
        else 
        {
            console.log('Invalid');
             res.render('error', { message: 'Some error occured!', error: "Error happened.."  });
        }
    });
    
  
});

module.exports = router;
