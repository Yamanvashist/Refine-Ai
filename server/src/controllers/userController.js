const User = require("../models/user")

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { name, email, password, role = "user" } = req.body;

        if (!name?.trim() || !email?.trim() || !password?.trim())
            return res.status(400).json({ message: "Fill all required fields!" });

        const userExist = await User.findOne({ email });
        if (userExist)
            return res.status(409).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            message: "User created",
            success: true,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
            credits: user.credits
        });
    } catch (err) {
        console.error("[register]", err);
        res.status(500).json({ message: "Server Error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email?.trim() || !password?.trim())
            return res.status(400).json({ message: "Fill all required fields!" });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(401).json({ message: "User does not Exist" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
            return res.status(401).json({ message: "Wrong password!" });

        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Login successful",
            success: true,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
            credits: user.credits
        });
    } catch (err) {
        console.error("[login]", err);
        res.status(500).json({ message: "Server Error" });
    }
};

const logout = (req, res) => {
    try {
        res.clearCookie("token", {
        })
        return res.status(200).json({ success: true, message: "Logged out successfully" })
    } catch (err) {
        res.status(500).json({ success: false, message: "Logged out failed" })
    }
}


module.exports = { register, login, logout }