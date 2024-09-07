const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.status(401).render('error', { msg: 'NOT AUTHENTICATED' });
};

const isMember = (req, res, next) => {
    if (req.user.status !== 'member' && req.user.status !== 'admin') {
        return next();
    }

    res.status(401).render('alreadyEnhancedStatus', {
        msg: 'You are already club member',
        user: req.user,
    });
};

const isAdmin = (req, res, next) => {
    if (req.user.status !== 'admin') {
        return next();
    }

    res.status(401).render('alreadyEnhancedStatus', {
        msg: 'You are already admin',
        user: req.user,
    });
};

module.exports = { isAuth, isMember, isAdmin };
