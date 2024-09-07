const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.status(401).render('error', { msg: 'NOT AUTHENTICATED' });
};

module.exports = { isAuth };
