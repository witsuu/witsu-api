const router = require("express").Router();
const contents = require("../models/contentSchema");
const uploadController = require('../controllers/imageController');

router.get("/get", async (req, res) => {
  const data = await contents.find();
  res.send(data);
});

router.post("/store", uploadController.uploadFile);

module.exports = router;