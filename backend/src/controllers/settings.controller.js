const User = require("../models/user");
const bcrypt = require('bcrypt');

exports.getSettings = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('preferences');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            preferences: user.preferences
        });
    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updatePreferences = async (req, res) => {
    try {
        const { theme, currency, notifications } = req.body;
        const user = await User.findById(
            req.user.id,
            {
                $set: {
                    preferences: {
                        theme,
                        currency,
                        notifications
                    }
                }
            },

            {
                new: true,
                runValidators: true
            }
        ).select("preferences");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Preferences updated successfully",
            preferences: user.preferences
        });
    }

    catch (error) {
        return res.status.json({
            success: false,
            message: error.message
        });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const isMatch = await user.comparePassword(currentPassword);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        user.password = newPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        });
    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Account deleted successfully'
        });
    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};