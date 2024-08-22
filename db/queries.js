const pool = require('./pool');

// GET queries
const getAllUsers = async () => {
    try {
        const query = `SELECT * FROM users`;
        const { rows } = await pool.query(query);
        return rows;
    } catch (err) {
        console.error('Error getting all users: ', err.stack);
        throw err;
    }
};

const getAllMessages = async () => {
    try {
        const query = `
        SELECT 
            messages.*, 
            users.firstName, 
            users.lastName 
        FROM 
            messages 
        INNER JOIN 
            messages.userId = users.id`;
        const { rows } = await pool.query(query);
        return rows;
    } catch (err) {
        console.error('Error getting all messages: ', err.stack);
        throw err;
    }
};

module.exports = { getAllUsers, getAllMessages };
