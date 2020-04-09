const Profile = require("../profiles/profile")
const ProfileManager = require("../profiles/profile-manager")
const Logger = require("../utils/logger")
const Configuration = require("../configuration")

function loadProfile(req, res, next) {
    const routeRegex = Configuration.load('prefix').routeRegex
    const regExp = new RegExp(routeRegex + "(.+)\/.+", 'i')
    const results = regExp.exec(req.url)
    console.log("loadProfile","regExp"+routeRegex +"admin/profiles","======req.url"+req.url)
    var profileName = undefined
	if ( results != undefined ) {
		profileName = results[1]
    }

    console.log("profileName",profileName)
    console.log("profileName",ProfileManager.default.profileNamed(profileName) )
    req.profile = ProfileManager.default.profileNamed(profileName) || Profile.default
	next()
}

module.exports = loadProfile