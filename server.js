"use strict";

var TAG = 'server.js-- ';
var express = require('express');
var app = express();
var csvImporter = require('npm-abhi-package');
var config = require('./config.js');
var api = require('./routes/api.js');
var env = require('./Environment/env.js').env;
var log = require('./Environment/log4js.js');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", req.headers.origin);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");
	res.header("Access-Control-Allow-Credentials", true);
	next();
});

//Routing
app.use('/api', api);

// Invalid path
app.use(function (req, res) {
	res.sendStatus(404);
});

if (env === "prd") {
	app.listen(8080);
	console.log('Listening on port 8080');
} else { //loc
	app.listen(8083);
	console.log('Listening on port 8083');
    
    //Invoke the library to import the csv file on start of the server.
	csvImporter.importData(config.dbConfig[env], "./SourceData/4rows.csv", function (err, result) {
		if (err) {
			console.log("Error uploading file: " + "err: " + err + "result: " + JSON.stringify(result));
			log.logger_upload.error(TAG + "Error uploading file: " + "err: " + err + "result: " + JSON.stringify(result));
		} else {
			console.log("File uploaded successfully");
			console.log('uploaded data statistics: ' + JSON.stringify(result.statistics));

			log.logger_helpers.info(TAG + 'Successfully processed csv file');
			log.logger_helpers.info(TAG + 'csv Import data statistics: ' + JSON.stringify(result.statistics));
			log.logger_upload.error(TAG + 'Errors in csv import, data: ' + JSON.stringify(result.errors));
		}
	});
}
module.exports = app