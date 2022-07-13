var createError = require('http-errors');
var express = require('express');
var socket_io = require('socket.io');
var path = require('path');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var session = require('express-session');
var logger = require('morgan');
var passport = require('passport');
let mongoose = require('mongoose');


// Express
var app = express();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

mongoose.Promise = global.Promise;
//mongoose.set('debug', true);


// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri = 'mongodb+srv://niavo:CwZICgddTGTe88E4@cluster0.dh9ov.mongodb.net/novid19?retryWrites=true&w=majority';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(uri, options)
    .then(() => {
          console.log("Connecté à la base MongoDB novid19 dans le cloud !");
        },
        err => {
          console.log('Erreur de connexion: ', err);
        });

var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
// Socket.io
var io = socket_io();
app.io = io;

// Routes
var routes = require('./routes')(io);

// App name
app.locals.app_name = "ACYM";
// Moment.js
var moment = require('moment');
app.locals.moment = require('moment');

// Imports dist from node_modules
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/img', express.static(path.join(__dirname, 'assets/img')));


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  secret: 'vanilla pay',
  resave: false,
  saveUninitialized: false,
})); // session secret
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

console.log("ATO ZAO")

//load passport strategies

//require('./services/passportAuth')(passport);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


module.exports = app;
