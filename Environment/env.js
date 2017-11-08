var TAG = 'env.js';

//Get Deployment Environment from deployment command line (The config can be managed and fetched from S3 as a config file)
//Example: node <app.js> <env>
var env = process.argv[2] || "loc";
if (env == '--recursive'){ // For Unit Testing
	env = "loc";
}

if (!( env === 'prd' || env === 'loc')) {
	throw new Error("The environment should be one of 'prd'(Production) or 'loc'(Local)..");
}
exports.env = env;