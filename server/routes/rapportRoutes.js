const express = require("express");

const {
  validator,
  registerRules,
  loginRules,
  editUserRules,
} = require("../middlewares/validators/bodyValidators");
const { createReport, downloadReport, getAllReports, updateReport } = require("../controllers/rapportController");

const router = express.Router();

/**
 *@method POST /rapport/add
 *@description post a report
 *@access protected(authentifié+role:student)
 */

router.post("/add", createReport);

/**
 * @method GET /rapport
 * @description Get all reports
 * @access Protected (only accessible to authenticated users)
 */
router.get("/", getAllReports);

/**
 * @method GET /rapport
 * @description download report
 * @access Protected (only accessible to authenticated users)
 */
router.get('/:id/download', downloadReport);

router.put('/:id', updateReport);



module.exports = router;
