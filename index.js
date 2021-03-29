const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require('passport')
const flash = require('connect-flash')

const InitiateMongoServer = require('./config/db');
const route = require('./routes/user')

InitiateMongoServer()

const app=express();

require('./controllers/usercontroller')(passport)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


const PORT = process.env.PORT || 8080

// app.get('/', (req, res) => {
//     res.send('Hello World starteded!')
// })

app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
});

app.use(route)