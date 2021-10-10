const express = require('express');
const router = express.Router();

const { addScrum , viewScrum , updateScrum , markAttendance } = require('../controllers/scrum');
const { checkRole, isLoggedIn, isVerified } = require('../middlewares/auth'); 
const Scrum = require('../models/scrum');

// router.use(userAuth);

router.param("userId", async (req, res, next, userId) => {
    console.log("INSIDE USERID PARAM FUNC");
    try {
        const scrum = await Scrum.findOne({
            where: {
                userId: userId
            },
        });
        if (scrum) {
            req.scrum = scrum;
            next();
        } else {
            return res.status(401).send("No scrum data found");
        }
    } catch (err) {
        console.log(err);
    }
});

router.param("isPresent", async (req, res, next, isPresent) => {
    console.log("INSIDE ISPRESENT");
    const att = isPresent === "true" ? true : false;
    req.body.isPresent = att;
    next();
  });

router.use(...isLoggedIn(), isVerified);

router.get('/scrum', viewScrum); //TODO
router.post('/scrum/add', addScrum);
router.put('/scrum/update/:userId', updateScrum);
router.put('/scrum/attendance/:userId/:isPresent', checkRole(["team-leader", "vice-team-leader"]), markAttendance);

module.exports = router;