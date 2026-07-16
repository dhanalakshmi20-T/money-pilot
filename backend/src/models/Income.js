const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    source: {
        type: String,
        required: true,
        trim: true
    },

    amount: {
        type: Number,
        required: true,
        min: 0
    },

    category: {
        type: String,
        required: true,
        enum: [
            "Salary",
            "Business",
            "Freelance",
            "Investment",
            "Bonus",
            "Gift",
            "Rental",
            "Other"
        ]
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    },

    note: {
        type: String,
        default: "",
        trim: true
    }
},

{
    timestamps: true
});

module.exports = mongoose.model("Income", incomeSchema);