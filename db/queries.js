const pool = require('./pool');

// GET QUERIES
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

// get all messages in revers (new one first)
const getAllMessages = async () => {
    try {
        const query = `
            SELECT 
                messages.*, 
                users.username, 
                users.status
            FROM 
                messages
            INNER JOIN 
                users 
            ON 
                messages.user_id = users.id
            ORDER BY
                messages.created_at DESC;`;
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
        return rows[0];
    } catch (err) {
        console.error('Error getting user by his name: ', err.stack);
        throw err;
    }
};

const getUserByUserId = async (id) => {
    try {
        const query = 'SELECT * FROM users WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    } catch (err) {
        console.error('Error getting user by his id: ', err.stack);
        throw err;
    }
};

// INSERT QUERIES
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

const createMessage = async (message) => {
    try {
        const query = `
        INSERT INTO 
            messages (title, content, user_id) 
        VALUES 
            ($1, $2, $3);`;

        const { rows } = await pool.query(query, [
            message.title,
            message.content,
            message.user_id,
        ]);
        return rows[0];
    } catch (err) {
        console.error('Error creating new message: ', err.stack);
        throw err;
    }
};

// UPDATE QUERIES
const updateToMember = async (user_id) => {
    try {
        const query = `
        UPDATE 
            users
        SET 
            status = 'member',
            updated_at = CURRENT_TIMESTAMP
        WHERE 
            id = $1;`;

        const { rows } = await pool.query(query, [user_id]);
        return rows[0];
    } catch (err) {
        console.error('Error updating user status to member: ', err.stack);
        throw err;
    }
};

const updateToAdmin = async (user_id) => {
    try {
        const query = `
        UPDATE 
            users
        SET 
            status = 'admin',
            updated_at = CURRENT_TIMESTAMP
        WHERE 
            id = $1;`;

        const { rows } = await pool.query(query, [user_id]);
        return rows[0];
    } catch (err) {
        console.error('Error updating user status to member: ', err.stack);
        throw err;
    }
};

// DELETE QUERIES
const deleteMessageById = async (message_id) => {
    try {
        const query = `
        DELETE FROM 
            messages
        WHERE 
            id = $1;
        `;

        const { rows } = await pool.query(query, [message_id]);
        return rows[0];
    } catch (err) {
        console.error('Error deleting message by id: ', err.stack);
        throw err;
    }
};

module.exports = {
    getAllUsers,
    getAllMessages,
    getUserByUsername,
    getUserByUserId,
    createUser,
    createMessage,
    updateToMember,
    updateToAdmin,
    deleteMessageById,
};
