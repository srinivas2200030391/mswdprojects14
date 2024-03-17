const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  loanTerm: {
    type: Number,
    required: true,
  },
  // Add other relevant fields as needed (e.g., collateral, purpose, etc.)
});

const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;
