const GrowthService = require('../../services/growth_entries/growth_entries.service');
const uploadImage = require('../../services/cloudinary/clodinary.service');

class GrowthController {
    static createGrowthEntry = async (req, res) => {
        try {
            const { userId, plantName, type, trackingInterval } = req.body;

            const day = {
                "weekly": 7,
                "monthly": 30,
                "bi-weekly": 15
            }

            const growthEntry = await GrowthService.createGrowthEntry({
                userId,
                plantName,
                type,
                trackingInterval,
                nextDate: Date.now() + day[trackingInterval] * 24 * 60 * 60 * 1000
            });

            res.status(201).json(growthEntry);
        } catch (error) {
            console.error('Error creating growth entry:', error);
            res.status(500).json({ error: 'An error occurred while creating the growth entry.' });
        }
    }

    static getAllGrowthEntries = async (req, res) => {
        try {
            const entries = await GrowthService.getAllGrowthEntries(req.params.userId);
            res.status(200).json(entries);
        } catch (error) {
            console.error('Error fetching growth entries:', error);
            res.status(500).json({ error: 'An error occurred while fetching growth entries.' });
        }
    }

    static uploadImageInGrowthEntry = async (req, res) => {
        try {
            const growthEntry = await GrowthService.getGrowthEntryById(req.params.id);

            if (!growthEntry) {
                return res.status(404).json({ error: 'Growth entry not found.' });
            }

            if (req.file) {
                const imageUrl = await uploadImage(req.file.path);

                // Get the next photo index
                const nextIndex = growthEntry.photos.length + 1;

                // Push properly structured photo object
                growthEntry.photos.push({
                    id: nextIndex,
                    url: imageUrl,
                    date: new Date(),
                    notes: req.body.notes || ''
                });
            }

            await growthEntry.save();
            res.status(200).json(growthEntry);
        } catch (error) {
            console.error('Error uploading image:', error);
            res.status(500).json({ error: 'An error occurred while uploading the image.' });
        }
    }
}

module.exports = GrowthController;