const Scrum = require('../models/scrum');
const Team = require('../models/team');
const User = require('../models/user');

const addScrum = async (req, res) => {
    const { userId, THAlink, backlog, lastLecture, THAprogress, topicsToCover, teamId } = req.body;
    try {
        const scrumData = await Scrum.findOne({
            where: {
                userId: userId,
            }
        });
        if (scrumData) {
            return res.status(500).send({
                msg: "Scrum sheet already filled",
            });
        }
        else {
            const scrum = await Scrum.create({
                userId,
                THAlink,
                backlog,
                lastLecture,
                THAprogress,
                topicsToCover,
                teamId
            });
            return res.status(200).send({
                msg: "Scrum sheet filled successfully",
                scrum: scrum,
            });
        }
    }
    catch (err) {
        return res.status(500).send({msg: err});
    }
};


const viewScrum = async (req, res) => {

};

const updateScrum = async(req, res) => {
    const scrum = req.scrum;
    console.log(scrum);
    if(req.body.THAlink)
        scrum.THAlink = req.body.THAlink;
    if(req.body.backlog)
        scrum.backlog = req.body.backlog;
    if(req.body.lastLecture)
        scrum.lastLecture = req.body.lastLecture;
    if(req.body.THAprogress)
        scrum.THAprogress = req.body.THAprogress;
    if(req.body.topicsToCover)
        scrum.topicsToCover = req.body.topicsToCover;

    const updatedScrum = await scrum.save();
    res.status(200).send(updatedScrum);
};

const markAttendance = async(req, res) => {
    console.log("INSIDE MARK ATTENDANCE");
    const scrum = req.scrum;
    scrum.isPresent = req.body.isPresent;
    const updatedScrum = await scrum.save();
    res.status(200).send(updatedScrum);
};

module.exports = { addScrum, viewScrum, updateScrum, markAttendance };