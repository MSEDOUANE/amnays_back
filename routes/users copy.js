const express = require("express");
const router = express.Router();
const users = require("../services/users");

/* GET. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting `, err.message);
    next(err);
  }
});

/* POST */
router.post("/", async function (req, res, next) {
  try {
    res.json(await users.create(req.body));
  } catch (err) {
    console.error(`Error while creating`, err.message);
    next(err);
  }
});

/* PUT */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await users.update(req));
  } catch (err) {
    console.error(`Error while updating`, err.message);
    next(err);
  }
});

/* DELETE */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await users.remove(req));
  } catch (err) {
    console.error(`Error while deleting`, err.message);
    next(err);
  }
});

module.exports = router;
