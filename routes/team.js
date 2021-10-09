/*

CHANGES I DID: ../models/user.js
                    added timestamp and paranoid
               ../models/team.js
                    added timestamp and paranoid

*/

const express = require('express');
const sequelize = require('../database/index');
const Team = require('../models/team')
const router = express.Router();

// connect to database and check if team exist 
// if not then throw error 
// else delete the row from database => DELETED SUCCESSFULLY

// req => TeamName


// convert input to lowercase
// search for the team in db

const deleteTeam = async (req, res) => {
    let {teamName} = req.body;

    // convert input to lowercase
    teamName = teamName.toLowerCase().replace(" ", "");

    try{
        // check if team exists or not
        const team = await Team.findOne({where: {teamName: teamName}});
        if(!team) {
            res.status(404).send("Team not found");
        }
    
        // if exists then do the following
        await Team.destroy({
            where: {
                teamName: teamName,
            }
        }).then((rowDeleted) => {
            if(rowDeleted===1) {
                console.log("------ROW DELETED SUCCESSFULLY-----")
            }
        }, (err) => {
            console.log(err);
        })
        ;

        console.log("Team deleted Successfully");
        
    }
    catch (err) {
        console.log("SOMETHING WENT WRONG WITH TEAM DELETION");
        console.error(err);
        res.status(501).send("Something's wrong with the server");
    }
};

router.delete('/delete', deleteTeam);

module.exports = router;