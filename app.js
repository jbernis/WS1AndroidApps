var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var awcredentialsRouter = require('./routes/settings/awCreds');
var airwatchRouter = require('./routes/products/airwatch');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));



app.use('/api/airwatch', awcredentialsRouter);
app.use('/api/uem', airwatchRouter);
app.use('*', (req, res) => res.sendFile(path.join(__dirname,'build', 'index.html')));




module.exports = app;

