// Name  : sendFile.js
// Author: Cerek Hillen
//
// Description:
//   This API endpoint describes the behavior of the server when a client
//   attemps to push a file.

/////////////
// Imports //

//////////
// Code //

// Posting to the url.
function post(req, res) {
    res.status(200).json({
        success: true
    });
}

/////////////
// Exports //
module.exports.post = post;
