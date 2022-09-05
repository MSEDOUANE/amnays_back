const express = require("express");
const router = express.Router();
const products = require("../services/Products");

/* GET. */
router.get("/", async function (req, res, next) {
  try {
    console.log(req);
    res.json(await products.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting `, err.message);
    next(err);
  }
});
/* GET. Best seeling */
router.post("/search", async function (req, res, next) {
  try {
    console.log(req.body);
    res.json(await products.search(req.body));
  } catch (err) {
    console.error(`Error while getting `, err.message);
    next(err);
  }
});
/* GET. */
router.get("/:id", async function (req, res, next) {
  try {
    console.log('id');
    res.json(await products.get('id', req.params.id));
  } catch (err) {
    console.error(`Error while getting `, err.message);
    next(err);
  }
});

/* GET. Best seeling */
router.get("/best", async function (req, res, next) {
  try {
    res.json(await products.get('meilleurV', 'MV'));
  } catch (err) {
    console.error(`Error while getting `, err.message);
    next(err);
  }
});



/* POST */
router.post("/", async function (req, res, next) {
  try {
    console.log(req);
    res.json(await products.create(req.body));
  } catch (err) {
    console.error(`Error while creating`, err.message);
    next(err);
  }
});

/* PUT */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await products.update(req));
  } catch (err) {
    console.error(`Error while updating`, err.message);
    next(err);
  }
});

/* DELETE */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await products.remove(req));
  } catch (err) {
    console.error(`Error while deleting`, err.message);
    next(err);
  }
});

module.exports = router;
