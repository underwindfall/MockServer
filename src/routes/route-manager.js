const path = require('path');
const Configuration = require('../configuration');
const Route = require('./route');
const Logger = require('../utils/logger');

/// Builder for all possible routes.
class RouteManager {
    /// Initialize the builder with the routes list.
    ///
    /// - parameter routes: The routes list.
    constructor() {
        const routes = Configuration.load('routes');
        this.routes = routes;
        this.routeModels = [];
    }

    /// Register all defined routes into the Express application.
    ///
    /// - parameter app: The Express application that will register the routes.
    /// Register all defined routes into the Express application.
    ///
    /// - parameter app: The Express application that will register the routes.
    build(app) {
        Logger.info('Discovering routes...');
        for (let routeName in this.routes) {
            const configuration = this.routes[routeName];
            const routePath = path.join('../mocks', configuration.folder);

            for (let request in configuration.requests) {
                let routeRequest = {};
                routeRequest[request] = configuration.requests[request];
                const route = new Route(routeName, routePath, routeRequest);
                route.build(app);

                //Add route to the list of routeModels
                this.routeModels.push(route);
            }
        }
    }

    /// Get the list of all known routes.
    ///
    /// - returns: All known routes as an array.
    list() {
        return this.routeModels;
    }

    /// Check if a given route exists.
    ///
    /// - parameter route: The route to test.
    /// - returns: true if the route exists.
    routeExists(route) {
        return this.routes.hasOwnProperty(route);
    }
}

RouteManager.default = new RouteManager();

module.exports = RouteManager;
