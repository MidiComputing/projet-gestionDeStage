const userModel = require("../models/userModel");

const createtoken = require("../tools/Token");

module.exports.Signup = async (req, res) => {
  const { email} = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ msg: "user already exists" });
    }

 
    const user = new userModel({ ...req.body });
    await user.save();
    res.send({ msg: "user successfully created", user: user });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports.signin = async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).send({
        msg: "there is no account linked to this email, please make sure that you type the email correctly",
      });
    }

  
    const payload = { userID: existingUser._id };
    const token = createtoken(payload);
   
    res.send({
      token,
      msg: "user succsessfully logged in",
      user: existingUser,
    });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports.getCurrentUser = (req, res) => {
  try {
    res.send({ user: req.user });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};
