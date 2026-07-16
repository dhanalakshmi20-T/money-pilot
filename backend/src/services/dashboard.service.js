const Expense = require("../models/Expense");
const Income = require("../models/Income");
const SavingsGoal = require("../models/SavingsGoal");
const Transaction = require("../models/Transaction");

const getDashboardData = async (userId) => {
    const incomeResult = await Income.aggregate([
        {
            $match: {
                user: userId
            }
        },

        {
            $group: {
                _id: null,
                total: {
                    $sum: "$amount"
                }
            }
        }
    ]);

    const expenseResult = await Expense.aggregate([
        {
            $match: {
                user: userId
            }
        },

        {
            $group: {
                _id: null,
                total: {
                    $sum: "$amount"
                }
            }
        }
    ]);

    const totalIncome = incomeResult.length > 0 ? incomeResult[0].total : 0;
    const totalExpense = expenseResult.length > 0 ? expenseResult[0].total : 0;

    const totalBalance = totalIncome - totalExpense;

    const savings = await SavingsGoal.aggregate([
        {
            $match: {
                user: userId
            }
        },

        {
            $group: {
                _id: null,
                total: {
                    $sum: "$currentAmount"
                }
            }
        }
    ]);

    const totalSavings = savings.length > 0 ? savings[0].total : 0;

    const recentTransactions = await Transaction.find({
        user: userId
    })
    .sort({
        transactionDate: -1
    })
    .limit(5);

    return {
        summary: {
            totalBalance,
            totalIncome,
            totalExpense,
            totalSavings
        },

        recentTransactions
    };
};

module.exports = { getDashboardData };