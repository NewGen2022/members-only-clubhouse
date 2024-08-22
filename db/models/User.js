const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define(
        'users',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            first_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                validate: {
                    len: [5, 100],
                },
            },
            last_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                validate: {
                    len: [5, 100],
                },
            },
            username: {
                type: DataTypes.STRING(150),
                unique: true,
                allowNull: false,
                validate: {
                    len: [5, 150],
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: 'user',
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        },
        {
            createdAt: 'created_at',
            updatedAt: false,
        }
    );

    return User;
};
