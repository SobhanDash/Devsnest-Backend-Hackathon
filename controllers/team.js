const {Op} = require('sequelize');
const express = require('express');
const { reset } = require('nodemon');
const sequelize = require('../database/index');
const Team = require('../models/team')
const User = require('../models/user')
const router = express.Router();

const {isUser, isTeam} = require('../utils/validate')


const deleteTeam = async (req, res) => {
    let {teamName} = req.body;

    teamName = teamName.toLowerCase().replace(/ /g, '');

    try{
        
        const team = await Team.findOne({where: {teamName: teamName}});

        if(!team) {
            res.status(404).send("Team not found");
        }

        console.log("THE TEAM IS:" + teamName);
        
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

        res.send("Team deleted Successfully");
    }
    catch (err) {
        console.log("SOMETHING WENT WRONG WITH TEAM DELETION");
        console.error(err);
        res.status(501).send("Something's wrong with the server");
    }
};



const createTeam =  async (req, res)=> {
    let { teamName, teamMembers} = req.body;

    try{
        const newTeam = new Team({
            // teamId: teamId,
            teamName: teamName.toLowerCase().replace(/ /g, ''),
            teamMembers: teamMembers,
        });

            const savedTeam = await newTeam.save();
            res.status(201).send(savedTeam);
            console.log(req);
    }
    catch(err) {
        console.log("THE ERROR IS: ");
        console.log(err);
        res.status(501).json({"error": "Something went wrong"});
    }
}

const updateTeamName = async (req, res) => {

    let {prevTeamName, newTeamName} = req.body;


    prevTeamName = prevTeamName.toLowerCase().replace(/ /g, '');
    newTeamName = newTeamName.toLowerCase().replace(/ /g, '');
                
    if(prevTeamName === newTeamName) {
        res.status(400).send("Names are same");
    }
    try{
        const team = await Team.findOne({where: { teamName: prevTeamName }});
        if(team) {
            team.update({
                teamName: newTeamName,
            }).then(() => {
                res.send("Team renamed successfully!");
            }, (err) => {
                console.log("Error: " + err);
            })
        }
        else{
            res.status(404).send("Team doesn't exist");
        }
    } catch(err) {
        res.send(501).json({"message":"Something went wrong"});
    }
}

const removeMember = async (req, res) => {
    let {memberId, teamName} = req.body;

    teamName = teamName.toLowerCase().replace(/ /g, '');
    
    try{
        if(!isTeam(teamName)) {
            res.status(401).send("Team doesn't exist");
        }
        
        
        // // check if member existed in team
        member = await Team.findOne({
            where : {
                teamMembers : {
                    [Op.contains] : [memberId],
                }
            }
        })

        if(!member) {
            res.status(401).send("User doesn't exist in the team")
        }
        else{
            // delete member
            Team.update(
                {'teamMembers': sequelize.fn('array_remove', sequelize.col('teamMembers'), memberId)}, {
                    where: {
                        teamName: teamName
                    }
                }
            )
        }
        
        
        
        res.status(200).send("User deleted successfully");
    } catch(err) {
        console.log("PROBLEM WITH DELETING MEMBER: " + err);
        res.status(501).send("Something went wrong while deletion: " + err)
    }
   
}


const addMember = async (req, res) => {
    let {memberId, teamName} = req.body;

    teamName = teamName.toLowerCase().replace(/ /g, '');
    
    try{
        if(!isTeam(teamName)) {
            res.status(401).send("Team doesn't exist");
        }
        
        
        // // check if member existed in team
        member = await Team.findOne({
            where : {
                teamMembers : {
                    [Op.contains] : [memberId],
                }
            }
        })

        if(member) {
            res.status(401).send("User exist in the team")
        }
        else{
            Team.update(
                {'teamMembers': sequelize.fn('array_append', sequelize.col('teamMembers'), memberId)}, {
                    where: {
                        teamName: teamName
                    }
                }
            )
        }
        

        
        res.status(200).send("User added successfully");
    } catch(err) {
        console.log("PROBLEM WITH ADDING MEMBER: " + err);
        res.status(501).send("Something went wrong while adding ")
    }
   
}




module.exports = {deleteTeam, createTeam, updateTeamName, removeMember, addMember} 