const userModel = require("../models/userModel");

module.exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await userModel.find(
      { role: { $in: ["student", "teacher"] } },
      { password: 0 }
    );

    res.send({ accounts });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};
