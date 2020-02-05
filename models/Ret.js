const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RetSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true},
    age: { type: Number, required: true},
    retire: { type: Number, required: true},
    yearsSavings: { type: Number, required: true},
    monthsSavings: { type: Number, required: true},
    expected: { type: Number, required: true},
    yearsRetire: { type: Number, required: true},
    monthsRetire: { type: Number, required: true},
    income: { type: Number, required: true},
    tax: { type: Number, required: true},
    netIncome: { type: Number, required: true},
    expense: { type: Number, required: true},
    actualMonthlySavings: { type: Number, required: true},
    totalSavings: { type: Number, required: true},
    realRateSavings: { type: Number, required: true},
    forecastedSavings: { type: Number, required: true},
    realRateRetire: { type: Number, required: true},
    forecastedRetire: { type: Number, required: true},
    residualGoal: { type: Number, required: true},
    savingsGoal: { type: Number, required: true},
    monthlySavingsGoal: { type: Number, required: true},
    monthlyExpenseGoal: { type: Number, required: true}
});

const BaseRet = mongoose.model("BaseRet", RetSchema);

module.exports = BaseRet