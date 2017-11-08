var TAG = 'log4js.js';
var log4js = require('log4js');
var env = require('./env.js').env;
var fs = require('fs');

var logger_helpers;
var logger_upload;

// Set log4js configuration based on the environment.
var log4jsEnv = {
    "prd": {
        "logDir": "./NodeJslogs",
        "logLevel": "INFO",
        "maxLogSize": 10048576, //10MB
        "backups": 10
    },
    "loc": {
        "logDir": "./NodeJslogs",
        "logLevel": "DEBUG",
        "maxLogSize": 10048576,
        "backups": 3
    }
};


var log4jsEnvParams = null;
if (env === 'prd') {
    log4jsEnvParams = log4jsEnv.prd;
} else {
    log4jsEnvParams = log4jsEnv.loc;
}

var logDir = log4jsEnvParams.logDir;
var maxLogSize = log4jsEnvParams.maxLogSize;
var backups = log4jsEnvParams.backups;
var logLevel = log4jsEnvParams.logLevel;

var log4jsConfig = {
    "appenders": [{
            "type": "file",
            "filename": logDir + "/" + "uploadErrors.log",
            "maxLogSize": maxLogSize,
            "backups": backups,
            "category": "uploadErrors"
        },{
            "type": "file",
            "filename": logDir + "/" + "helpers.log",
            "maxLogSize": maxLogSize,
            "backups": backups,
            "category": "helpers"
        }
    ]
};

function createLogDir(callback) {
    fs.exists(logDir, function (exists) {
        if (!(exists)) {
            fs.mkdir(logDir, function (err) {
                if (err) {
                    console.log("Log Directory Cannot be Created: " + logDir + "." + err);
                    throw new Error();
                } else {
                    callback(true, "Log Directory created: " + logDir);
                }
            });
        } else {
            callback(true, "Log Directory Exists: " + logDir);
        }
    });
}


//Configure logger_upload,logger_helpers
createLogDir(function (success, result) {

    if (success) {
        log4js.configure(log4jsConfig, {});

        //Log for Upload Errors.
        logger_upload = log4js.getLogger("uploadErrors");
        logger_upload.setLevel(logLevel);
        exports.logger_upload = logger_upload;

        //Log for helpers (generic).
        logger_helpers = log4js.getLogger("helpers");
        logger_helpers.setLevel(logLevel);
        exports.logger_helpers = logger_helpers;

    }
});