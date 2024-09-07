const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.status(401).render('error', { msg: 'NOT AUTHENTICATED' });
};

const isUser = (req, res, next) => {
    if (req.user.status !== 'user') {
        return next();
    }

    res.redirect('/join-club');
};

const isMember = (req, res, next) => {
    if (req.user.status !== 'member' && req.user.status !== 'admin') {
        return next();
    }

    res.status(401).render('alreadyEnhancedStatus', {
        msg: 'You are already CLUB MEMBER',
        user: req.user,
    });
};

const isAdmin = (req, res, next) => {
    if (req.user.status !== 'admin') {
        return next();
    }

    res.status(401).render('alreadyEnhancedStatus', {
        msg: 'You are already ADMIN',
        user: req.user,
    });
};

module.exports = { isAuth, isUser, isMember, isAdmin };
