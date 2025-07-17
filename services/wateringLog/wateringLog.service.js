const wateringLogModel = require("../../models/wateringLog.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../config/db");

class wateringLogService {
    static registerWateringLog = async (wateringLogData) => {
        try {
            const registeredWateringLog = await wateringLogModel.create(wateringLogData);
            return registeredWateringLog;
        } catch (error) {
            throw error;
        }
    }
    static async getWateringLogByUserId(userId) {
        try {
            const resData = await wateringLogModel.find({ userId });
            return resData;
        } catch (error) {
            throw error;
        }
    }
    static async getWateringLogById(id) {
        try {
            const resData = await wateringLogModel.findById(id);
            return resData;
        } catch (error) {
            throw error;
        }
    }
    static async getAllWateringLog() {
        try {
            const resData = await wateringLogModel.find();
            return resData;
        } catch (error) {
            throw error;
        }
    }
    static async updateWateringLog(id, wateringLogData) {
        try {
            const resData = await wateringLogModel.findByIdAndUpdate(id, wateringLogData, { new: true });
            return resData;
        } catch (error) {
            throw error;
        }
    }
    static async deleteWateringLog(id) {
        try {
            const resData = await wateringLogModel.findByIdAndDelete(id);
            return resData;
        } catch (error) {
            throw error;
        }
    }
    static async getWateringLogByUserIdAndDate(userId, date) {
        try {
            const resData = await wateringLogModel.find({ userId, date });
            return resData;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = wateringLogService;