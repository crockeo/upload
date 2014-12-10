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
    },

    render: function () {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Upload something:</label>
                    <input ref="fileInput" type="file" required />
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
