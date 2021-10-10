const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Scrum = sequelize.define('Scrum',
{
    userId: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull: false,
        autoIncrement:true
    },
    THAlink: {
        type: DataTypes.STRING,
        allowNull: false
    },
    backlog: {
        type: DataTypes.STRING
    },
    lastLecture: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    THAprogress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    topicsToCover: {
        type: DataTypes.STRING,
    },
    isPresent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    date: {
        type: DataTypes.DATE,
    },
    teamId: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
});

module.exports = Scrum;







    



