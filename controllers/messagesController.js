const {
    getAllMessages,
    createMessage,
    deleteMessageById,
} = require('../db/queries');
const { formatDate } = require('../public/js/utils');

const main = async (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    const messages = await getAllMessages();
    res.render('index', {
        isAuthenticated: isAuthenticated,
        messages: messages,
        user: req.user,
        formatDate: formatDate,
    });
};

const addMsg = async (req, res) => {
    const message = {
        title: req.body.title,
        content: req.body.content,
        user_id: req.user.id,
    };

    try {
        await createMessage(message);
        res.redirect('/');
    } catch (err) {
        console.error('Error creating new message: ', err.stack);
        res.status(500).render('error', { msg: 'Internal Server Error' });
    }
};

const deleteMsg = async (req, res) => {
    const messageId = req.body.messageId;

    try {
        await deleteMessageById(messageId);
        return res.redirect('/');
    } catch (error) {
        console.error('Error deleting message:', error);
        return res
            .status(500)
            .render('error', { msg: 'Internal Server Error' });
    }
};

module.exports = { main, addMsg, deleteMsg };
