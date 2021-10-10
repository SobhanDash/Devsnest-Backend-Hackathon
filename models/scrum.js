const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Scrum = sequelize.define('Scrum',
{
    UserId: {
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
    LastLecture: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    THA_Progress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Topics_To_Cover: {
        type: DataTypes.STRING,
    },
    Present: {
        type: DataTypes.BOOLEAN,
        defaultValue: false

    },
    date: {
        type: DataTypes.DATE,
    }
});

module.exports = Scrum;







    



