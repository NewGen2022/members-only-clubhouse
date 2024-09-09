const sequelize = require('./sequelize');
const UserModel = require('./models/User');
const MessageModel = require('./models/Message');

// Initialize models
const User = UserModel(sequelize);
const Message = MessageModel(sequelize);

const initDB = async () => {
    try {
        // Sync all models with the database
        await sequelize.sync({ force: false }); // Set to true to drop and recreate tables on each sync (useful for development)
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Error creating database & tables:', error);
    }
};

module.exports = initDB;
