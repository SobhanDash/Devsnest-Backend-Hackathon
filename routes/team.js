const {Op} = require('sequelize');
const express = require('express');
const { reset } = require('nodemon');
const sequelize = require('../database/index');
const Team = require('../models/team')
const User = require('../models/user')
const {deleteTeam, createTeam, updateTeamName, removeMember,addMember} = require('../controllers/team');
const { checkRole } = require('../middlewares/auth');
const router = express.Router();

const {isUser, isTeam} = require('../utils/validate')

// Associations
// sequelize.user.hasMany(sequelize.team)
// sequelize.team.belongsTo(sequelize.user);

// User.hasOne(Team);
// Team.belongsTo(User);

//// localhost:3000/api/team/update/delete-team
router.delete('/update/delete-team',checkRole(["admin", "batch-leader"]), deleteTeam);

// localhost:3000/api/team/update/create-team
router.post('/update/create-team',checkRole(["admin", "batch-leader"]), createTeam);

// localhost:3000/api/team/update/team-name
router.put('/update/team-name',checkRole(["admin", "batch-leader"]), updateTeamName);

//localhost:3000/api/team/update/renove-member
router.put('/update/remove-member',checkRole(["admin", "batch-leader"]), removeMember);

//localhost:3000/api/team/update/add-member
router.put('/update/add-member',checkRole(["admin", "batch-leader"]), addMember);



// TEAM MEMBER: 
/*
    To add member:
        check if memberID already exists.
        if yes then ERROR. else add the member.
*/
/*
To remove member: 
    check if the memberID already exists. 
    if yes then remove member. else ERROR
*/





module.exports = router;