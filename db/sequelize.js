require('dotenv').config();

const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize(
    process.env.DATABASE_URL || process.env.DB_CONNECTION,
    {
        dialect: 'postgres',
        logging: false,
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
