const diagnosisModel = require("../../models/diagnosis.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../config/db");

class diagnosisService {
    static registerDiagnosis = async (diagnosisData) => {
        try {
            const registeredDiagnosis = await diagnosisModel.create(diagnosisData);
            return registeredDiagnosis;
        } catch (error) {
            throw error;
        }
    }
    static async getDiagnosisByUserId(userId) {
        try {
            const resData = await diagnosisModel.find({ userId });
            return resData;
        } catch (error) {
            throw error;
        }
    }
    static async getDiagnosisById(id) {
        try {
            const resData = await diagnosisModel.findById(id);
            return resData;
        } catch (error) {
            throw error;
        }
    }
    static async getAllDiagnosis() {
        try {
            const resData = await diagnosisModel.find();
            return resData;
        } catch (error) {
            throw error;
        }
    }
    static async updateDiagnosis(id, diagnosisData) {
        try {
            const resData = await diagnosisModel.findByIdAndUpdate(id, diagnosisData, { new: true });
            return resData;
        } catch (error) {
            throw error;
        }
    }
    static async deleteDiagnosis(id) {
        try {
            const resData = await diagnosisModel.findByIdAndDelete(id);
            return resData;
        } catch (error) {
            throw error;
        }
    }
    static async getDiagnosisByImageUrl(imageUrl) {
        try {
            const resData = await diagnosisModel.findOne({ imageUrl });
            return resData;
        } catch (error) {
            throw error;
        }
    }
    static async getDiagnosisByUserIdAndImageUrl(userId, imageUrl) {
        try {
            const resData = await diagnosisModel.findOne({ userId, imageUrl });
            return resData;
        } catch (error) {
            throw error;
        }
    }
    static async deleteDiagnosisByUserId(userId) {
        try {
            const resData = await diagnosisModel.deleteMany({ userId });
            return resData;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = diagnosisService;