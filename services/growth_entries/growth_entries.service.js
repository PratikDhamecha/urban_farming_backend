const growthEntriesModel = require('../../models/growth_entries/growth_entries.model');

class GrowthEntriesService {
    static createGrowthEntry = async (entryData) => {
        try {
            const newEntry = new growthEntriesModel(entryData);
            await newEntry.save();
            return { message: 'Growth entry created successfully', entry: newEntry };
        } catch (error) {
            throw new Error('Error creating growth entry');
        }
    }

    static getGrowthEntryById = async (entryId) => {
        try {
            const entry = await growthEntriesModel.findById(entryId);
            if (!entry) {
                throw new Error('Growth entry not found');
            }
            return entry;
        } catch (error) {
            throw new Error('Error fetching growth entry');
        }
    }

    static updateGrowthEntry = async (entryId, updateData) => {
        try {
            const entry = await growthEntriesModel.findByIdAndUpdate(entryId, updateData, { new: true });
            if (!entry) {
                throw new Error('Growth entry not found');
            }
            return entry;
        } catch (error) {
            throw new Error('Error updating growth entry');
        }
    }

    static deleteGrowthEntry = async (entryId) => {
        try {
            const entry = await growthEntriesModel.findByIdAndDelete(entryId);
            if (!entry) {
                throw new Error('Growth entry not found');
            }
            return { message: 'Growth entry deleted successfully' };
        } catch (error) {
            throw new Error('Error deleting growth entry');
        }
    }

    static getAllGrowthEntries = async () => {
        try {
            const entries = await growthEntriesModel.find();
            return entries;
        } catch (error) {
            throw new Error('Error fetching growth entries');
        }
    }
}

module.exports = GrowthEntriesService;
// This service handles CRUD operations for growth entries, similar to the schedule service.