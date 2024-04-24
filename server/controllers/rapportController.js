const rapportModel = require("../models/rapportModel");

const fs = require("fs");
const path = require("path");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage }).array("files");

module.exports.createReport = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res
          .status(400)
          .json({ msg: "Error uploading files", error: err });
      }
      const { student, application, rapport_status, message } = req.body;
      const parsedApplication = JSON.parse(application);
      const files = req.files.map((file) => file.path);

      // Check if a report already exists for the application
      const existingReport = await rapportModel.findOne({
        "application._id": parsedApplication._id,
      });

      if (existingReport) {
        // Update the existing report with new information
        existingReport.student = student;
        existingReport.message = message;
        existingReport.files = files;
        existingReport.rapport_status = rapport_status;
        await existingReport.save();
        res.json({ msg: "Report updated", report: existingReport });
      } else {
        // Create a new report
        const newRapport = new rapportModel({
          student,
          files,
          application: parsedApplication,
          rapport_status,
          message,
          
        });
        await newRapport.save();
        res.json({ msg: "Report successfully created", report: newRapport });
      }
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports.downloadReport = async (req, res) => {
  try {
    const report = await rapportModel.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ msg: "Report not found" });
    }

    // Check if the report has files
    if (!report.files || report.files.length === 0) {
      return res.status(404).json({ msg: "No files found for the report" });
    }

    // Generate download links for each file
    const downloadLinks = report.files.map((file) => ({
      filename: path.basename(file),
      link: `${req.protocol}://${req.get("host")}/rapport/${
        req.params.id
      }/download/${path.basename(file)}`,
    }));

    res.json({ downloadLinks });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Function to handle file download
module.exports.downloadFile = async (req, res) => {
  try {
    const report = await rapportModel.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ msg: "Report not found" });
    }

    // Check if the file exists in the report
    const file = report.files.find(
      (file) => path.basename(file) === req.params.filename
    );
    if (!file) {
      return res.status(404).json({ msg: "File not found" });
    }

    // Set the file path
    const filePath = path.join(__dirname, "..", file);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ msg: "File not found" });
    }

    // Send the file as a download
    res.download(filePath);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await rapportModel.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { rapport_status, message, date_soutenance } = req.body;

    const existingReport = await rapportModel.findById(id);
    if (!existingReport) {
      return res.status(404).json({ msg: "Report not found" });
    }

    if (rapport_status !== undefined) {
      existingReport.rapport_status = rapport_status;
    }

    if (message !== undefined) {
      existingReport.message.push(message);
    }

    if (date_soutenance !== undefined) {
      existingReport.date_soutenance = date_soutenance;
    }

    await existingReport.save();

    res.json({ msg: "Report updated successfully", report: existingReport });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
