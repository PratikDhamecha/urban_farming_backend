const growthEntriesModel = require('../../models/growth/growth.model');

// Validate model import
if (!growthEntriesModel) {
    console.error('ERROR: growthEntriesModel is not properly imported');
}

class GrowthEntriesService {
    static createGrowthEntry = async (entryData) => {
        try {
            console.log('Creating growth entry with data:', entryData);
            const newEntry = new growthEntriesModel(entryData);
            await newEntry.save();
            return { message: 'Growth entry created successfully', entry: newEntry, success: true };
        } catch (error) {
            console.error('Error creating growth entry:', error);
            throw new Error(`Error creating growth entry: ${error.message}`);
        }
    }

    static getGrowthEntryById = async (entryId) => {
        try {
            if (!entryId) {
                throw new Error('Entry ID is required');
            }
            
            const entry = await growthEntriesModel.findById(entryId);
            if (!entry) {
                throw new Error('Growth entry not found');
            }
            return entry;
        } catch (error) {
            console.error('Error fetching growth entry by ID:', error);
            throw new Error(`Error fetching growth entry: ${error.message}`);
        }
    }

    static updateGrowthEntry = async (entryId, updateData) => {
        try {
            if (!entryId) {
                throw new Error('Entry ID is required');
            }
            
            const entry = await growthEntriesModel.findByIdAndUpdate(entryId, updateData, { new: true });
            if (!entry) {
                throw new Error('Growth entry not found');
            }
            return entry;
        } catch (error) {
            console.error('Error updating growth entry:', error);
            throw new Error(`Error updating growth entry: ${error.message}`);
        }
    }

    static deleteGrowthEntry = async (entryId) => {
        try {
            if (!entryId) {
                throw new Error('Entry ID is required');
            }
            
            const entry = await growthEntriesModel.findByIdAndDelete(entryId);
            if (!entry) {
                throw new Error('Growth entry not found');
            }
            return { message: 'Growth entry deleted successfully' };
        } catch (error) {
            console.error('Error deleting growth entry:', error);
            throw new Error(`Error deleting growth entry: ${error.message}`);
        }
    }

    static getAllGrowthEntries = async (userId) => {
        try {
            // Add validation for userId
            if (!userId) {
                throw new Error('User ID is required');
            }

            // Validate ObjectId format
            const mongoose = require('mongoose');
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                throw new Error('Invalid user ID format');
            }

            console.log('Fetching growth entries for userId:', userId);
            const entries = await growthEntriesModel.find({ userId }).sort({ recordedAt: -1 }).lean();
            console.log('Found entries:', entries.length);
            return entries;
        } catch (error) {
            console.error('Detailed error in getAllGrowthEntries:', error);
            throw new Error(`Error fetching growth entries: ${error.message}`);
        }
    }

    // Add a test method to check if the model works
    static testConnection = async () => {
        try {
            const count = await growthEntriesModel.countDocuments();
            console.log('Total growth entries in database:', count);
            return { success: true, count };
        } catch (error) {
            console.error('Database connection test failed:', error);
            throw new Error(`Database test failed: ${error.message}`);
        }
    }
}

module.exports = GrowthEntriesService;
// This service handles CRUD operations for growth entries, similar to the schedule service.