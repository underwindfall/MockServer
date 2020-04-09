const ProfileManager = require('../profiles/profile-manager').default;
const RouteManager = require('../routes/route-manager').default;

const pathPrefix = '/mock/security';
class AdminRoutes {
    /// Build the admin scetions routes.
    ///
    /// - parameter app: The Express app.
    static build(app) {
        app.get(`${pathPrefix}/admin`, (req, res) => {
            res.redirect(`${pathPrefix}/admin/profiles`);
        });

        app.get(`${pathPrefix}/admin/profiles`, (req, res) => {
			res.render('index', {
                pathPrefix: pathPrefix,
                profiles: ProfileManager.listProfiles()
			})
        })
        
    	app.get(`${pathPrefix}/admin/profiles/:profile`, (req, res) => {
			AdminRoutes.renderProfile(req, res)
		})
		
		app.post(`${pathPrefix}/admin/profiles/:profile`, (req, res) => {
			req.params.updated = ProfileManager.updateProfile(req.params.profile, req.body)
			AdminRoutes.renderProfile(req, res)
		})
    }

    static renderProfile(req, res) {
        const profileName = req.params.profile || 'default';
        if (!ProfileManager.profileExists(profileName)) {
            res.redirect(`${pathPrefix}/admin/profiles`)
            return;
        }
        const profile = ProfileManager.profileNamed(profileName);
        const routes = RouteManager.list();
        res.render('profile', {
            profile: profile,
            routes: routes,
            pathPrefix: pathPrefix,
            updated: req.params.updated != undefined,
            success: !!req.params.updated,
        });
    }
}
module.exports = AdminRoutes;
