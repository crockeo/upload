// Name  : app.js
// Author: Cerek Hillen
//
// Description:
//   The main entry point to the web application. Links together serving the
//   compiled static files and the dynamic API endpoints.

/////////////
// Imports //
var express = require('express'),
    fs      = require('fs'),
    api     = require('./api.js');

//////////
// Code //

// Creating the app.
var app = express();

// Determining the port of the app.
var port = process.env.PORT;
if (port === undefined)
    port = 3000;

// Serving static files.
app.use('/static', express.static(__dirname + '/static'));

// Serving HTML files.
app.use(express.static(__dirname + '/pages'));

// Serving API documentation on the root API route if documentation exists.
app.use('/api', function (req, res, next) {
    fs.exists('pages/apidoc.html', function (exists) {
        if (exists)
            res.status(200).sendFile('pages/apidoc.html');
        else
            next()
    });
});

// Registering the API section of the app.
app.use('/api', api);

// Serving a 404 page (plaintext if a 404.html does not exist).
app.use(function (req, res, next) {
    fs.exists(__dirname + '/pages/404.html', function (exists) {
        if (exists)
            res.status(404).sendFile(__dirname + '/pages/404.html');
        else
            res.status(404).send('Error 404: Page not found.');
    });
});

// Serving the content.
console.log('Server started on port ' + port);
app.listen(port);
