const path = require('path');
const express = require('express');
const AdminRoute = require('./admin-routes');

/// The administration panel module.
class AdminPanel {
    /// Setup the administration panel module.
    ///
    /// - parameter app: The Express app.
    static setup(app) {
        app.engine('html', require('ejs').renderFile);
        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, 'views'));
        app.disable('view cache');
        app.use('/js', express.static(path.join(__dirname, '/views/js')));
        AdminRoute.build(app);
    }
}

module.exports = AdminPanel;
