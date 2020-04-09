const ProfileManager = require('../profiles/profile-manager').default;
const RouteManager = require('../routes/route-manager').default;

class AdminRoutes {
    /// Build the admin scetions routes.
    ///
    /// - parameter app: The Express app.
    static build(app) {
        app.get('/admin', (req, res) => {
            res.redirect('/admin/profiles');
        });

        app.get('/admin/profiles', (req, res) => {
            res.render('index', {
                profiles: ProfileManager.listProfiles(),
            });
        });

        app.get('/admin/profiles/:profile', (req, res) => {
            AdminRoutes.renderProfile(req, res);
        });

        app.post('/admin/profiles/:profile', (req, res) => {
            req.params.updated = ProfileManager.updateProfile(req.params.profile, req.body);
            AdminRoutes.renderProfile(req, res);
        });
    }

    static renderProfile(req, res) {
        const profileName = req.params.profile || 'default';
        if (!profileManager.profileExists(profileName)) {
            res.redirect('/admin/profiles');
            return;
        }

        let profile = ProfileManager.profileNamed(profileName);
        let routes = RouteManager.list();
        res.render('profile', {
            profile: profile,
            routes: routes,
            updated: req.params.updated != undefined,
            success: !!req.params.updated,
        });
    }
}
module.exports = AdminRoutes;
