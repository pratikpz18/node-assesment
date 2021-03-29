const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require('passport')
const flash = require('connect-flash')
const session  = require('express-session');

const InitiateMongoServer = require('./config/db');

const user = require('./routes/user')
const task = require('./routes/task')

InitiateMongoServer()

const app=express();

require('./controllers/usercontroller')(passport)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.set('view engine', 'ejs');

app.use(session({ 
    secret: 'nodeassesment',
    resave: true,
    saveUninitialized: true,
})); 

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


const PORT = process.env.PORT || 8080

// app.get('/', (req, res) => {
//     res.send('Hello World starteded!')
// })

app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
});

app.use(user)
app.use('/task',task)