const express = require('express');
const router = express.Router()
const passport = require('passport')

const User = require('../models/usermodel')

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/login', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));



router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/home', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true,
}));


router.get('/home',isLoggedIn,function (req, res) { 
    res.render("home"); 
});  

router.get('/signup',function (req, res) { 
    console.log("d")
    res.render("signup")
});  

router.get('/login',function (req, res) { 
    console.log("d")
    res.render("login.ejs")
});  

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/login')
});

function isLoggedIn(req, res, next){

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
    return next();
    
    // if they aren't redirect them to the home page
    res.redirect('/login');
    }

module.exports = router