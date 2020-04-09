const express = require('express');
const bodyParser = require('body-parser');
const Logger = require('./utils/logger');
const AdminPanel = require('./admin/admin-panel');
const RouteManager = require('./routes/route-manager');
const ProfileMiddleware = require("./middleware/profile-middleware")

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
        app.use(ProfileMiddleware)
        //display admin panel
        AdminPanel.setup(app);
        RouteManager.default.build(app);

        app.listen(this.port, () => Logger.info(`Mock server is listening to port ${this.port}`));
    }
}

module.exports = Server;
