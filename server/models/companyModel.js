const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: { type: String },
  student: { type: mongoose.Types.ObjectId, ref: "users" },
});

const companyModel = mongoose.model("company", companySchema);

module.exports = companyModel;
