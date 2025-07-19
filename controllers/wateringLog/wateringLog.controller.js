const wateringLogService = require('../../services/wateringLog/wateringLog.service');

class WateringLogController {
    static registerWateringLog = async (req, res) => {
        try{
            const {userId} = req.body;
            if (!userId) {
                return res.status(400).json({ message: 'User ID is required' });
            }
            const newLog = await wateringLogService.registerWateringLog(req.body);
            return res.status(201).json(newLog);
        }catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = WateringLogController;