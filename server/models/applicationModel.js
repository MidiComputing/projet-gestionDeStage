const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  companyName: { type: String },
  student: { type: mongoose.Types.ObjectId, ref: "users" },
  createdAt: { type: Date, default: Date.now() },
  status: { type: String },
});

const applicationModel = mongoose.model("application", applicationSchema);

module.exports = applicationModel;
