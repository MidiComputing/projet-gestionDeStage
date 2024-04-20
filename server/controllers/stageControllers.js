const companyModel = require("../models/companyModel");
const applicationModel = require("../models/applicationModel");

module.exports.addCompany = async (req, res) => {
  try {
    const company = new companyModel({ ...req.body });
    await company.save();
    res.send({ msg: "company successfully added" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports.getallCompanies = async (req, res) => {
  try {
    const companies = await companyModel.find({});

    res.send({ companies });
  } catch (error) {
    res.send({ msg: error.message });
  }
};

module.exports.deleteCompany = async (req, res) => {
  const { companyID } = req.params;
  try {
    const company = await companyModel.findByIdAndDelete(companyID);
    if (!company) {
      return res.status(404).send({ msg: "Company not found" });
    }
    res.send({ msg: "Company deleted successfully" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports.addApplication = async (req, res) => {
  try {
    const application = new applicationModel({ ...req.body });
    await application.save();
    res.send({ msg: "Application successfully submitted" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports.getallApplications = async (req, res) => {
  try {
    const applications = await applicationModel.find({});

    res.send({ applications });
  } catch (error) {
    res.send({ msg: error.message });
  }
};

module.exports.updateApplication = async (req, res) => {
  try {
    const { idApplication } = req.body;
    const { status } = req.body;

    const application = await applicationModel.findByIdAndUpdate(
      idApplication,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.send({
      application: application,
      msg:
        status == "declined"
          ? "Application declined"
          : status == "approved"
          ? "Application approved"
          : "",
    });
  } catch (error) {
    res.send({ msg: error.message });
  }
};
