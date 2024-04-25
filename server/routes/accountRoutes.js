const express = require("express");

const IsAuth = require("../middlewares/authorization/IsAuth");
const {
  validator,
  registerRules,
  loginRules,
  editUserRules,
} = require("../middlewares/validators/bodyValidators");
const { getAllAccounts } = require("../controllers/accountControllers");

const router = express.Router();


 /**
 *@method GET /auth/
 *@description  get all users
 *@access authenticated user
 */
 router.get("/",IsAuth(), getAllAccounts) 


module.exports = router;


