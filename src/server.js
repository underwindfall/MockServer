const Configuration = require('./configuration');
const express = require('express');
const bodyParser = require('body-parser');

// A simple mocking server
class Server {
    /// Initialize the server with a given listening port.
    ///
    /// - parameter port: The server's listening port.
    constructor(port) {
        this.port = port;
    }

    // Start a server
    start() {
        const app = express();
        const payloadLimit = '50mb';
        app.use(
            bodyParser.urlencoded({
                limit: payloadLimit,
                extended: true,
            }),
        );

        app.use(bodyParser.json({ limit: payloadLimit }));

        //TODO to replace by somehting like general admin panel
        app.set('views', './views');
        app.set('view engine', 'ejs');

        app.listen(this.port, () =>
            console.log(`Mock server is listening to  http://localhost:${this.port}`),
        );
    }
}

module.exports = Server;
