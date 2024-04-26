const mongoose = require("mongoose");

const loanApplicantSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  loanAmount: {
    type: String,
    required: true,
  },
  interestRate: {
    type: String,
    required: true,
  },
  loanTerm: {
    type: String,
    required: true,
  },
  applicantAccount: {
    type: String,
    required: true,
  },
  applicantName: {
    type: String,
    required: true,
  },
  // Add other relevant fields as needed (e.g., collateral, purpose, etc.)
});

const LoanApplicant = mongoose.model("LoanApplicant", loanApplicantSchema);

module.exports = LoanApplicant;
