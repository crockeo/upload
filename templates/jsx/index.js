// The portion of the React app to represent a message one may send to the user.
var Message = React.createClass({
    render: function () {
        return (
            <h3 className="message-text">{this.props.message}</h3>
        );
    }
});

// The portion of the React app that is the input form.
var Form = React.createClass({
    onSubmit: function (e) {
        e.preventDefault();

        var fi = this.refs.fileInput.getDOMNode();
        if (fi.files[0]) {
            this.props.setMessage('Trying to upload...');

            var boundary = 'blob';

            // Constructing the data.
            var data = '';

            data += '--' + boundary + '\r\n';
            data += 'content-disposition: form-data' +
                    'name="' + fi.name + '"; ' +
                    'filename="' + fi.files[0].name + '"\r\n';
            data += 'Content-Type: ' + fi.files[0].type + '\r\n';
            data += '\r\n';
            data += fi.binary + '\r\n';

            // Opening the request.
            var xhr = new XMLHttpRequest();

            // Adding event listeners for success and failure.
            xhr.addEventListener('load', function (e) {
                console.log(e);
                // this.props.setMessage('File sent!');
            }.bind(this));

            // Finally sending the data.
            xhr.open('POST', '/api/sendFile', true);
            xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
            xhr.setRequestHeader('Content-Type', data.length);
            xhr.send(data);
        } else {
            this.props.setMessage('You forgot to choose a file!');
        }
    },

    render: function () {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Upload something:</label>
                    <input ref="fileInput" type="file" />
                </div>

                <button className="btn btn-default" type="submit">Upload</button>
            </form>
        );
    }
});

// The primary host application for the React app.
var App = React.createClass({
    getInitialState: function () {
        return {
            message: 'No message yet!'
        };
    },

    setMessage: function (message) {
        this.setState({ message: message });
    },

    render: function () {
        return (
            <div>
                <h3 className="message">{this.state.message}</h3>
                <Form setMessage={this.setMessage} />
            </div>
        );
    }
});

// Rendering the app once the page has loaded.
$(document).ready(function () {
    React.render((
        <App />
    ), $('#reactWrapper')[0]);
});
