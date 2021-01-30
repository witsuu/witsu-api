const router = require("express").Router();
const contents = require("../models/contentSchema");
const uploadController = require("../controllers/contentController");

router.get("/get", async (req, res) => {
  const data = await contents.find();
  res.send(data);
});

router.post("/store", uploadController.uploadFile);

router.get("/img/:id", uploadController.getImage);

module.exports = router;
