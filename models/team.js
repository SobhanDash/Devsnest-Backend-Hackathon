const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');
const User = require('./user');

const Team = sequelize.define('Team', {
    teamId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    teamName: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    teamMembers: {
        //TODO
        // type: DataTypes.ARRAY(DataTypes.STRING),
        type: DataTypes.ARRAY(DataTypes.BIGINT), 

        allowNull: false,
    }
})

module.exports = Team;