// Name  : api.js
// Author: Cerek Hillen
//
// Description:
//   This module should register every single API route.

/////////////
// Imports //
var express    = require('express'),
    bodyParser = require('body-parser'),
    multer     = require('multer'),

    sendFile = require('./api/sendFile.js');

//////////
// Code //

// Creating the API section of the app.
var app = express();

// Parsing POST requests as JSON.
app.use(bodyParser.json());

// Parsing multipart/form-data requests.
app.use(multer({
    dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename;
    }
}));

// Register API routes here:
app.post('/sendFile', sendFile.post);

/////////////
// Exports //
module.exports = app;
