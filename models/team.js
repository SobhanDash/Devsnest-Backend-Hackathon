const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');
const User = require('./user');

const Team = sequelize.define('Team', {
    teamId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
    },
    teamName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    teamMembers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    }
})

module.exports = Team;