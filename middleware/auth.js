const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).render('error', { msg: 'NOT AUTHENTICATED' });
    }
};

module.export = { isAuth };
