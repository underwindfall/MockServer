const path = require('path');
const fs = require('fs');
const JSONResponse = require('../response/json-response');
const Logger = require('../utils/logger');
const Configuration = require('../configuration');

/// Represent an endpoint.
class Route {
    /// Create a new endpoint.
    ///
    /// - parameter name: The endpoint's URL that will be registered in express.
    /// - parameter path: The endpoint folder's name that contain JSON files.
    /// - parameter request: All possible requests types (get, post, ...) for the endpoint (optional).
    /// - seealso: `mapping/routes.js`
    constructor(name, path, requests) {
        this.name = name;
        this.path = path;
        this.requests = requests || {};
        this.modifiers = this.getModifiers();
        // this.getModifiers = this.getModifiers.bind(this);
        for (let request in this.requests) {
            this.type = request.toUpperCase();
            this.label = this.type + ' ' + this.name;
        }
    }

    getModifiers() {
        let modifiers = [];
        for (let request in this.requests) {
            let responseFile = this.requests[request];
            let realPath = path.join(__dirname, '..', this.path);
            fs.readdirSync(realPath).forEach((file) => {
                //Remove extension
                const fileName = file.replace(path.extname(file), '');

                //Split with responseFile + "_"
                const fileNameSplitted = fileName.split(responseFile + '_');
                if (fileNameSplitted.length > 1 && fileNameSplitted[0] === '') {
                    modifiers.push(fileNameSplitted[1]);
                }
            });
        }

        if (modifiers.length > 0) {
            Logger.info(`modifiers = ${modifiers}`);
        }
        return modifiers;
    }

    manageJson(req, res, responseFile) {
        const profile = req.profile;
        if (profile.modifiers != undefined && profile.modifiers[this.label] != undefined) {
            responseFile += '_' + profile.modifiers[this.label] + '.json';
        } else {
            responseFile += '.json';
        }
        const jsonFilePath = path.join(this.path, responseFile);
        const response = new JSONResponse(jsonFilePath);

        // response.data is a String type. If the native parser fail to convert it into a real object,
        // juste send the response as String, and print an error message.
        let finalResponse = response.data;
        try {
            finalResponse = JSON.parse(response.data);
        } catch (err) {
            Logger.error(`Invalid JSON reponse from file ${jsonFilePath}.`);
        }
        res.setHeader('Content-Type', 'application/json');

        res.send(finalResponse);
    }

    /// Register the endpoint to the application.
    ///
    /// - parameter app: The express application.
    build(app) {
        for (let request in this.requests) {
            const routePrefix = Configuration.load('prefix').routePrefix;
            let routeUrl = path.join(routePrefix, this.name);
            let handler = function (req, res) {
                let responseFile = this.requests[request];
                this.manageJson(req, res, responseFile);
            };
            app[request](routeUrl, handler.bind(this));
            Logger.info(`route: ${request.toUpperCase()} ${routeUrl}`)
        }
    }
}

module.exports = Route;
