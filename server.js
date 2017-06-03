// Get dependencies
require('app-module-path').addPath(__dirname);
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const argv = require('minimist')(process.argv.slice(2));

// Get our API routes
const api = require('server/routes/api');

const app = express();
const subpath = express();

// Connect to database
mongoose.connect('mongodb://localhost:27017/league')

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : false
}));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'swagger')));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect bootstrap CSS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap-social')); // redirect bootstrap-social CSS
app.use('/css', express.static(__dirname + '/node_modules/font-awesome/css')); // redirect font awesome CSS
app.use('/fonts', express.static(__dirname + '/node_modules/font-awesome/fonts')); // redirect font awesome fonts

// Set our api routes
app.use('/api', api);

// Swagger configuration
app.use('/swagger', subpath);
const swagger = require('swagger-node-express').createNew(subpath);
swagger.setApiInfo({
	title : "League API",
	description : "League API",
	termsOfServiceUrl : "",
	contact : "allenying0104@gmail.com",
	license : "",
	licenseUrl : ""
});
app.get('/swagger', function (req, res) {
    res.sendFile(__dirname + '/swagger/index.html');
});
swagger.configureSwaggerPaths('', 'api-docs', '');
const swaggerDomain = 'localhost';
if (argv.domain !== undefined) {
	swaggerDomain = argv.domain;
} else {
	console.log('No --domain=xxx specified, taking default hostname "localhost".')
}

const swaggerPort = 3000;
if (argv.port !== undefined) {
	swaggerPort = argv.port;
} else {
	console.log('No --port=xxx specified, taking default port ' + swaggerPort + '.')
}

// Set and display the application URL
const applicationUrl = 'http://' + swaggerDomain + ':' + swaggerPort;
console.log('snapJob API running on ' + applicationUrl);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));