var TAG = 'getIPDetails.js-- ';
var express = require('express');
var app = express();
var csvImporter = require('npm-abhi-package');
var env = require('../Environment/env.js').env;
var log = require('../Environment/log4js.js');
var config = require('../config.js');

// below getIPDetails api returns json as response in all cases.(angular internally calls this api and takes json response)
exports.getIPDetails = (req, res) => {
    var logger = log.logger_helpers;

    csvImporter.getIPDetails(config.dbConfig[env], req.query.ip, function (err, response) {
        if (!err) {
            var resJson = {
                'http_code': 200,
                'response': response
            };
            logger.info(TAG + 'Successfully fetched IP Details')
            res.statusCode = resJson.http_code;
            res.json(resJson);
        } else {
            var resJson = {
                'http_code': 500,
                'response': 'Internal Server Error'
            };
            logger.error(TAG + 'Internal Server Error,err: ' + JSON.stringify(response));
            res.statusCode = resJson.http_code;
            res.json(resJson);
        };
    });
    return res;
};