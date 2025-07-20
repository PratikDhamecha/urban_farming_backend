const express = require('express');
const router = express.Router();
const scheduleController = require('../../controllers/schedule/scheduleController');
const authMiddleware = require('../../middleware/authMiddleware');

router.get('/', authMiddleware, scheduleController.getSchedulesByDate);
router.post('/', authMiddleware, scheduleController.createSchedule);
router.put('/:id', authMiddleware, scheduleController.updateSchedule);
router.delete('/:id', authMiddleware, scheduleController.deleteSchedule);

module.exports = router;