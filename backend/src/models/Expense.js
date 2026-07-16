const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
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

    category: {
        type: String,
        required: true,
        enum: [
            "Food",
            "Transaction",
            "Shopping",
            "Entertainment",
            "Health",
            "Education",
            "Bills",
            "Travel",
            "Investment",
            "Other"
        ]
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

    date: {
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

module.exports = mongoose.model("Expense", expenseSchema);