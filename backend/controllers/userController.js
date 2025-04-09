import { response } from "express";
import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

//Route for user login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Incorrect username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Incorrect username or password" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//Route for user signup
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        //check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        //Validating email formal & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //creating user
        const newUser = new userModel({ name, email, password: hashedPassword });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: "Incorrect username or password" });
        }

        const token = createToken(email);
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Get user profile
const getProfile = async (req, res) => {
    try {
        const userId = req.body.userId || req.userId;

        const user = await userModel.findById(userId).select("-password");

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, data: user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



// Update user profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.body.userId || req.userId;
        const { name, email } = req.body;

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true }
        ).select("-password");

        res.json({ success: true, data: updatedUser });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



export { loginUser, registerUser, adminLogin, getProfile, updateProfile };