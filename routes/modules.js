const express = require("express");
const router = express.Router();
const modules = require("../services/modules");

/* GET. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await modules.getAllModules());
  } catch (err) {
    console.error(`Error while getting `, err.message);
    next(err);
  }
});


module.exports = router;
