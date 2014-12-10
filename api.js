// Name  : api.js
// Author: Cerek Hillen
//
// Description:
//   This module should register every single API route.

/////////////
// Imports //
var express    = require('express'),
    bodyParser = require('body-parser'),

    sendFile = require('./api/sendFile.js');

//////////
// Code //

// Creating the API section of the app.
var app = express();

// Parsing POST requests as JSON.
app.use(bodyParser.json());

// Register API routes here:
app.post('/sendFile', sendFile.post);

/////////////
// Exports //
module.exports = app;
