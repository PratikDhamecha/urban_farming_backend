const userModel = require('../../models/user/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserService {
    static registerUser = async (userData) => {
        try {
            const { email, password } = userData;
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new userModel({
                ...userData,
                password: hashedPassword
            }); 
            await newUser.save();
            return { message: 'User registered successfully', user: newUser };
        } catch (error) {
            throw new Error('Error registering user');
        }
    }

    static loginUser = async (email, password) => {
        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { token };
        } catch (error) {
            throw new Error('Error logging in user');
        }
    }

    static getUserById = async (userId) => {
        try {
            const user = await userModel.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Error fetching user');
        }
    }

    static updateUser = async (userId, updateData) => {
        try {
            const user = await userModel.findByIdAndUpdate(userId, updateData, { new: true });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Error fetching user');
        }
    }

    static deleteUser = async (userId) => {
        try {
            const user = await userModel.findByIdAndDelete(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return { message: 'User deleted successfully' };
        } catch (error) {
            throw new Error('Error deleting user');
        }
    }
}

module.exports = UserService;
// This service handles user registration, login, fetching, updating, and deleting user data.
