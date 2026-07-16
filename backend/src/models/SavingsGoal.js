const mongoose = require("mongoose");

const savingsGoalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true,
        trim: true
    },

    targetAmount: {
        type: Number,
        required: true,
        min:1
    },

    currentAmount: {
        type: Number,
        default: 0,
        min: 0
    },

    targetDate: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: [
            "ACTIVE",
            "COMPLETED",
            "CANCELLED"
        ],
        default: 'ACTIVE'
    },

    description: {
        type: String,
        default: "",
        trim: true
    }
},

{
    timestamps: true
});

module.exports = mongoose.model("SavingsGoal", savingsGoalSchema);