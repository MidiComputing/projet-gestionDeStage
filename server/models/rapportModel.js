const mongoose = require("mongoose");

const rapportSchema = new mongoose.Schema({
  student: { type: mongoose.Types.ObjectId, ref: "users" },
  application: { type: Object },
  files: [{ type: String }],
  rapport_status: { type: String },
  message: [{ type: String }],
  date_soutenance: { type: Date },
});

const rapportModel = mongoose.model("rapport", rapportSchema);

module.exports = rapportModel;
