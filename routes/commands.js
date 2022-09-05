const express = require("express");
const router = express.Router();
const commands = require("../services/commands");
const clients = require("../services/clients");

/* GET. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await commands.getAll(req.query.page));
  } catch (err) {
    console.error(`Error while getting `, err.message);
    next(err);
  }
});

/* GET. */
router.get("/:id", async function (req, res, next) {
  try {
    res.json(await commands.getCommande(req.params.id));
  } catch (err) {
    console.error(`Error while getting `, err.message);
    next(err);
  }
});

/* POST */
router.post("/", async function (req, res, next) {
  try {
    let { command, client } = req.body;
    command.dateCmd = Date.now;
    res.json(await commands.create(command));
    let c = await clients.get('email', client.email);
    
    if (!c) {
      clients.create({
        'Reff': client.email,
        'nom': client.fullName,
        'tele': client.phoneNumber,
        'email': client.email,
        'ville': client.city,
        'Adresse': client.address,
      });
    }
  } catch (err) {
    console.error(`Error while creating`, err.message);
    next(err);
  }
});

/* PUT */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await commands.update(req));
  } catch (err) {
    console.error(`Error while updating`, err.message);
    next(err);
  }
});

/* DELETE */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await commands.remove(req));
  } catch (err) {
    console.error(`Error while deleting`, err.message);
    next(err);
  }
});

module.exports = router;
