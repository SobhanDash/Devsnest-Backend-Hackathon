const express = require('express');
const router = express.Router();

const { addScrum , viewScrum , updateScrum , markAttendance } = require('../controllers/scrum');
const { checkRole } = require('../utils/auth'); 

// router.use(userAuth);

router.get('/', viewScrum);
router.post('/add', addScrum);
router.put('/update', updateScrum);
router.post('/mark', checkRole(["team-leader", "vice-team-leader"]), markAttendance);

module.exports = router;