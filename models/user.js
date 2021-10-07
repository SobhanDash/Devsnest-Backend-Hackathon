const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User',
{
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM,
        values: ["student", "team-leader", "vice-team-leader", "batch-leader"],
        defaultValue: "student"
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    team: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.BIGINT,
    },
    profileImage: {
        type: DataTypes.STRING,
    },
    link: {
        type: DataTypes.STRING,
    }
});

module.exports = User;