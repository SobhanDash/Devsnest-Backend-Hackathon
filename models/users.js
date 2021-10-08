const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', 
{
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    confirm_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    
    
});

module.exports = User;