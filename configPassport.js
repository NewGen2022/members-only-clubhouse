const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { getUserByUsername, getUserByUserId } = require('./db/queries');
const bcrypt = require('bcryptjs');

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await getUserByUsername(username);

            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username',
                });
            }

            const matchPasswords = await bcrypt.compare(
                password,
                user.password
            );
            if (!matchPasswords) {
                // passwords do not match!
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, user);
        } catch (err) {
            console.error(err);
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUserByUserId(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
