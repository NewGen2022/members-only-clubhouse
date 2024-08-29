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

const getUserByUsername = async (username) => {
    try {
        const query = 'SELECT * FROM users WHERE username = $1';
        const { rows } = await pool.query(query, [username]);
        return rows.length > 0;
    } catch (err) {
        console.error('Error getting user by his name: ', err.stack);
        throw err;
    }
};

// INSERT queries
const createUser = async (userData) => {
    try {
        const query = `
            INSERT INTO 
                users (first_name, last_name, username, password)
            VALUES
                ($1, $2, $3, $4)
            RETURNING 
                id, username;
        `;

        const { rows } = await pool.query(query, [
            userData.firstName,
            userData.lastName,
            userData.username,
            userData.password,
        ]);
        return rows[0];
    } catch (err) {
        console.error('Error creating new user: ', err.stack);
        throw err;
    }
};

module.exports = { getAllUsers, getAllMessages, getUserByUsername, createUser };
