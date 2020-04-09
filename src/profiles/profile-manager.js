const fs = require('fs');
const path = require('path');
const Profile = require('./profile');
const Logger = require('../utils/logger');

class ProfileManager {
    constructor() {
        this._index();
    }

    //index all existing profiles
    _index() {
        Logger.info('Indexing all profiles ......');
        this.profiles = {};
        const profileDirectory = path.join(__dirname, '../../profiles');
        fs.readdirSync(profileDirectory).forEach((file) => {
            const fileData = path.parse(file);
            if (fileData.ext != '.json') {
                return;
            }

            const profileDescription = {
                data: undefined,
            };

            this.profiles[fileData.name] = profileDescription;
            Logger.info('profile: ' + fileData.name);
        });
    }

    /// Load a profile using its name.
    ///
    /// - parameter profile: The profile name.
    /// - note: This method reload the profile if it's already loaded.
    _load(profile) {
        if (!this.profileExists(profile)) {
            return;
        }

        this.profiles[profile].data = new Profile(profile);
    }

    /// Check if a given profile name exists.
    ///
    /// - parameter profile: The profile name.
    /// - returns: true if the profile exists.
    profileExists(profile) {
        return this.profiles[profile] != undefined;
    }

    /// Check if a given profile is already loaded.
    ///
    /// - parameter profile: The profile name.
    /// - returns: true if the profile is loaded.
    profileIsLoaded(profile) {
        return this.profileExists(profile) && this.profiles[profile].data != undefined;
    }

    /// Request a profile using its name.
    ///
    /// - parameter profile: Name of the desired profile.
    /// - returns: The requiested profile or undefined.
    profileNamed(profile) {
        if (!this.profileExists(profile)) {
            return undefined;
        }

        if (this.profileIsLoaded(profile)) {
            return this.profiles[profile].data;
        }

        this._load(profile);
        return this.profiles[profile].data;
    }

    /// Update a profile with new values.
    ///
    /// - parameter profileName: The profile to update.
    /// - parameter data: New data for the profile.
    /// - returns: true if the profile is updated, false otherwise.
    updateProfile(profileName, data) {
        if (!this.profileExists(profileName)) {
            return false;
        }

        let profile = this.profileNamed(profileName);
        profile.purgeModifiers();

        Object.keys(data).forEach((key) => {
            this._updateModifier(profile, key, data[key]);
        });

        if (profileName == 'default') {
            Profile.default = profile;
        }

        return true;
    }

    /// Update a modifier on a given profile. Set value to undefined to remove a modifier.
    ///
    /// - parameter profile: The profile to update.
    /// - parameter key: The modifier key.
    /// - parameter value: The modifier's new value.
    _updateModifier(profile, key, value) {
        let modifier = value[0];

        if (modifier == undefined || modifier == '') {
            delete profile.modifiers[key];
        } else {
            profile.modifiers[key] = modifier;
        }
    }

    /// Get the list of all indexed profiles.
    ///
    /// - returns: An array that contain all indexed profiles.
    listProfiles() {
        return Object.keys(this.profiles);
    }
}

ProfileManager.default = new ProfileManager();

module.exports = ProfileManager;
