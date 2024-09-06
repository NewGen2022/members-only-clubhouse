const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }

    res.status(401).render('error', { msg: 'NOT AUTHENTICATED' });
};

module.exports = { isAuth };
