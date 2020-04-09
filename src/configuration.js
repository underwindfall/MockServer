const path = require('path');

class Configuration {
    /// Load a specific configuration file.
    ///
    /// - parameter name: Name of the configuration file without extension. The configuration file
    ///		must be located in the `configuration` folder.
    /// - returns: The configuration object or undefined.

    static load(name) {
        try {
            const configuration = require(path.join('../configuration', name + '.js'));
            return configuration;
        } catch (error) {
            return undefined;
        }
    }
}

module.exports = Configuration;
