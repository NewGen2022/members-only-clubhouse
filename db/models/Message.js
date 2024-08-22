const { DataTypes, Sequelize } = require('sequelize');
const UserModel = require('./User');

module.exports = (sequelize) => {
    const Message = sequelize.define(
        'messages',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
                validate: {
                    len: [5, 255],
                },
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: UserModel(sequelize),
                    key: 'id',
                },
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

    return Message;
};
