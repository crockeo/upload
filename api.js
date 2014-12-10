// Name  : api.js
// Author: Cerek Hillen
//
// Description:
//   This module should register every single API route.

/////////////
// Imports //
var express    = require('express'),
    bodyParser = require('body-parser');

//////////
// Code //

// Creating the API section of the app.
var app = express();

// Parsing POST requests as JSON.
app.use(bodyParser.json());

// Register API routes here:

/////////////
// Exports //
module.exports = app;
