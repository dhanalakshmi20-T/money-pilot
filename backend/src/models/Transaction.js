const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
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

    amount: {
        type: Number,
        required: true,
        min: 0
    },

    type: {
        type: String,
        enum: ["INCOME", "EXPENSE"],
        required: true
    },

    category: {
        type: String,
        required: true
    },

    paymentMethod: {
        type: String,
        enum: [
            "Cash",
            "UPI",
            "Credit Card",
            "Debit Card",
            "Net Banking",
            "Wallet"
        ],
        default: "UPI"
    },

    transactionDate: {
        type: Date,
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

module.exports = mongoose.model("Transaction", transactionSchema);