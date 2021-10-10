const express = require('express');
const router = express.Router();

const { addScrum , viewScrum , updateScrum , markAttendance } = require('../controllers/scrum');
const { checkRole } = require('../middlewares/auth'); 

// router.use(userAuth);

router.get('/scrum', viewScrum);
router.post('/scrum/add', addScrum);
router.put('/scrum/update', updateScrum);
router.post('/scrum/attendance', checkRole(["team-leader", "vice-team-leader"]), markAttendance);

module.exports = router;