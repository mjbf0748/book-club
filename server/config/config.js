// check env
var env = process.env.NODE_ENV || 'development';

// Reference to json file containing configuration data for development and production
const config = require('./config.json'); 

// Reference to environment appropriate environment
const envConfig = config[env];

// Add en. config values to process.env
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);