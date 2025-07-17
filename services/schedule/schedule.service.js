const scheduleModel = require('../../models/schedule/schedule.model');

class ScheduleService {
    static createSchedule = async (scheduleData) => {
        try {
            const newSchedule = new scheduleModel(scheduleData);
            await newSchedule.save();
            return { message: 'Schedule created successfully', schedule: newSchedule };
        } catch (error) {
            throw new Error('Error creating schedule');
        }
    }   

    static getScheduleById = async (scheduleId) => {
        try {
            const schedule = await scheduleModel.findById(scheduleId);
            if (!schedule) {
                throw new Error('Schedule not found');
            }
            return schedule;
        } catch (error) {
            throw new Error('Error fetching schedule');
        }
    }

    static updateSchedule = async (scheduleId, updateData) => {
        try {
            const schedule = await scheduleModel.findByIdAndUpdate(scheduleId, updateData, { new: true });
            if (!schedule) {
                throw new Error('Schedule not found');
            }
            return schedule;
        } catch (error) {
            throw new Error('Error updating schedule');
        }
    }

    static deleteSchedule = async (scheduleId) => {
        try {
            const schedule = await scheduleModel.findByIdAndDelete(scheduleId);
            if (!schedule) {
                throw new Error('Schedule not found');
            }
            return { message: 'Schedule deleted successfully' };
        } catch (error) {
            throw new Error('Error deleting schedule');
        }
    }

    static getAllSchedules = async () => {
        try {
            const schedules = await scheduleModel.find();
            return schedules;
        } catch (error) {
            throw new Error('Error fetching schedules');
        }
    }
}

module.exports = ScheduleService;
// This service handles CRUD operations for schedules.