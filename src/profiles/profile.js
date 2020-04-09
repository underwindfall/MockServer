const path = require('path');
const fs = require('fs');
const Logger = require('../utils/logger');

class Profile {
    /// Load a profile using its name.
    ///
    /// - parameter profileName: The profile name that match a profile configuration in the `profiles` folder.
    constructor(profileName) {
        this._load(profileName);
    }

    /// Remove all modifiers from the profile.
    purgeModifiers() {
        this.modifiers = {};
    }

    /// Load the given profile.
    ///
    /// - parameter profile: The profile name.
    _load(profile) {
        const profilePath = path.join(__dirname, '../../profiles', profile + '.json');
        let parameters = {};
        try {
            const rawProfile = fs.readFileSync(profilePath, 'utf8');
            parameters = JSON.parse(rawProfile);
        } catch (err) {
            Logger.error(`Unable to load profile: ${profile} from file: profilePath`);
            Logger.error('error: ' + err);
            parameters = {};
        }
        this.name = profile;
        this.modifiers = parameters.modifiers || {};
    }
}

Profile.default = new Profile('default');

module.exports = Profile;
