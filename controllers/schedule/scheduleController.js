const Schedule = require('../../models/schedule/scheduleModel');

exports.getSchedulesByDate = async (req, res) => {
  try {
    const { date } = req.query;
    // Ensure the date filter correctly covers the entire day
    const startOfDayDate = new Date(date);
    startOfDayDate.setUTCHours(0, 0, 0, 0); // Set to start of the day in UTC

    const endOfDayDate = new Date(date);
    endOfDayDate.setUTCHours(23, 59, 59, 999); // Set to end of the day in UTC

    const schedules = await Schedule.find({
      userId: req.user._id,
      scheduledAt: {
        $gte: startOfDayDate,
        $lte: endOfDayDate // Use $lte to include tasks throughout the day
      }
    });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSchedule = async (req, res) => {
  try {
    const schedule = new Schedule({
      ...req.body,
      userId: req.user._id
    });
    await schedule.save();
    res.status(201).json(schedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    res.json(schedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    await Schedule.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
