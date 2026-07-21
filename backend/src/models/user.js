const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },

        phone: {
            type: String,
            default: ""
        },

        role: {
            type: String,
            enum: ['USER', 'ADMIN'],
            default: 'USER'
        },

        isActive: {
            type: Boolean,
            default: true
        },

        profileImage: {
            type: String,
            default: ''
        },

        preferences: {
            theme: {
                type: String,
                enum: ['light', 'dark', 'system'],
                default: 'light'
            },

            currency: {
                type: String,
                enum: ['INR', 'USD', 'EUR', 'GBP'],
                default: 'INR'
            },

            notifications: {
                email: {
                    type: Boolean,
                    default: true
                },

                budgetAlerts: {
                    type: Boolean,
                    default: true
                },

                savingsReminder: {
                    type: Boolean,
                    default: true
                }
            }
        }
    },

    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }

    catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);