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


router.delete('/update/delete-team',checkRole(["admin", "batch-leader"]), deleteTeam);

router.post('/update/create-team',checkRole(["admin", "batch-leader"]), createTeam);

router.put('/update/team-name',checkRole(["admin", "batch-leader"]), updateTeamName);

router.put('/update/remove-member',checkRole(["admin", "batch-leader"]), removeMember);

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