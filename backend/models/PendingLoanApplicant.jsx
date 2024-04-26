const mongoose = require("mongoose");

const PendingLoanApplicantSchema = new mongoose.Schema({
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
  status: {
    type: String,
    default: "Applied",
  },
  // Add other relevant fields as needed (e.g., collateral, purpose, etc.)
});

const PendingLoanApplicant = mongoose.model("PendingLoanApplicant", PendingLoanApplicantSchema);

module.exports = PendingLoanApplicant;
