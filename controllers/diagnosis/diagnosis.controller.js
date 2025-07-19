const diagnosisService = require('../../services/diagnosis/diagnosis.service');
const uploadImage = require('../../services/cloudinary/clodinary.service');
class DiagnosisController {
    static registerDiagnosis = async (req, res) => {
        try {
            const { userId, imageUrl, result, confidence } = req.body;
            if (!userId || !imageUrl || !result || confidence === undefined) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            if(req.file){
                // If an image was uploaded, set the image URL
                req.body.imageUrl = await uploadImage(req.file.path);
            }
            const newDiagnosis = await diagnosisService.registerDiagnosis(req.body);
            return res.status(201).json(newDiagnosis);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static getDiagnosisByUserId = async (req, res) => {
        try {
            const { userId } = req.params;
            if (!userId) {
                return res.status(400).json({ message: 'User ID is required' });
            }
            const diagnosisData = await diagnosisService.getDiagnosisByUserId(userId);
            return res.status(200).json(diagnosisData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = DiagnosisController;