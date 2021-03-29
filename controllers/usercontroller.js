const User = require('../models/usermodel');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = function(passport) {
//passport  serialize and unserialize users out of session
passport.serializeUser(function(user, done) {
done(null, user.id);
});

passport.deserializeUser(function(id, done) {
User.findById(id, function(err, user) {
done(err, user);
});
});

// ======================SIGNUP ===========================
passport.use('local-signup', new LocalStrategy({
// by default, local strategy uses username and password, we will override with email
usernameField : 'email',
passwordField : 'password',
passReqToCallback : true 
// allows us to pass back the entire request to the callback
},
async function(req,email, password, done) {
 // User.findOne won't fire unless data is sent back
process.nextTick( function() {

// find a user whose email is the same as the forms email
User.findOne({ 'email' :  email },async function(err, user) {
if (err)
return done(err);

if (user) {
return done(null,user,false,{message:'User exist'});
} else {

// if there is no user with that email -create the user
var newUser = new User();

// set the user's local credentials
newUser.email    = req.body.email;
newUser.password = req.body.password;


const salt = await bcrypt.genSalt(10);
newUser.password = await bcrypt.hash(password, salt);
// save the user
newUser.save(function (err) {
    if (err) {throw err;}
    console.log(newUser.email + ' Registration succesful');
    return done(null, newUser,{message:'Registration succesful'});
});
}
});    
});
}));

// =================LOCAL LOGIN ======================================

passport.use('local-login', new LocalStrategy({
usernameField : 'email',
passwordField : 'password',
passReqToCallback : true 
},
function(req,email, password, done) { 
// find a user whose email is the same as the forms email
User.findOne({ 'email' :  email },async function(err, user) {
if (err)
return done(err);
if (!user)
return done(null, false,{message:'User Not Found'}); // req.flash is the way to set flashdata using connect-flash
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch)
return done(null, false,{message:'Password Incorrect'}); // create the loginMessage and save it to session as flashdata
// all is well, return successful user
// res.render("home"); 
return done(null, user);
});
}));

};