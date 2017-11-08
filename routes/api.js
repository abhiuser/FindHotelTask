var TAG = 'api.js-- ';
var express = require('express');
var app = express();
var displayForm = require('./displayForm').displayForm;
var getIPDetails = require('./getIPDetails').getIPDetails;

//Routing
app.get('/getIPDetails', getIPDetails);

app.get('/displayForm', displayForm);// to display HTML page.

module.exports = app;