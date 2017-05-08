var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

var User = require('../models/user')
var Teacher = require('../models/teachers');

//***********HIT for Adding Teachers**************
router.post('/', function(req, res, next) {
     
    var name = req.body.name
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email
     
    console.log( username + name + password )
    
    var newTeacher = new Teacher({name: name, username: username, password: password, email: email});
    
    var newUser = new User({name: name, username: username, password: password});
   
    newTeacher.save(function(err){

    if ( err ) 
      {
          throw err;
      }
    else
       {
          req.flash('info', 'Teacher added successfully!')
	      res.render('admin_profile', { title: 'Outcome Based Education Management System',message: req.flash('info'), name: req.session.username  });
          console.log("Teacher Added Successfully");
       }
	});
   
    newUser.save(function(err){

    if ( err ) 
      {
          throw err;
      }
    else
       {
	      console.log("Teacher Added in Users who can Login! ");
       }
	});


    });

module.exports = router;