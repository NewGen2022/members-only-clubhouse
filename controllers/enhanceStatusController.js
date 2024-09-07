const { updateToMember, updateToAdmin } = require('../db/queries');

const updateUserToMember = async (req, res) => {
    if (req.body.join_club_phrase === req.user.username) {
        try {
            await updateToMember(req.user.id);
            res.redirect('/join-club/success');
        } catch (err) {
            console.error('Error updating user to member:', err);
            res.render('./join_club/join-club', {
                user: req.user,
                errors: 'An error occurred while updating your status. Please try again later.',
            });
        }
    } else {
        res.render('./join_club/join-club', {
            user: req.user,
            errors: 'Wrong secret phrase',
        });
    }
};

const updateUserToAdmin = async (req, res) => {
    if (
        req.body.become_admin_phrase ===
        req.user.username.split('').reverse().join('')
    ) {
        try {
            await updateToAdmin(req.user.id);
            res.redirect('/become-admin/success');
        } catch (err) {
            console.error('Error updating user to member:', err);
            res.render('./become_admin/become-admin', {
                user: req.user,
                errors: 'An error occurred while updating your status. Please try again later.',
            });
        }
    } else {
        res.render('./become_admin/become-admin', {
            user: req.user,
            errors: 'Wrong secret phrase',
        });
    }
};

module.exports = { updateUserToMember, updateUserToAdmin };
