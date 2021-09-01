const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        },
        blog_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'blog',
                key: "id"
            },
            onDelete: "cascade"
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: "id"
            },
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',  
    }
);

module.exports = Comment;