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
    teamMembers: [
        { 
            name: User.name,
            profileImage: User.profileImage,
        }
    ]
    // member: {
    //     // [name, id, password]: User,
    //     name: User.name,
    //     profileImage: User.profileImage,
    // }
})