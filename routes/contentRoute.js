const router = require("express").Router();
const contents = require("../models/contentSchema");

router.get("/get", async (req, res) => {
  const data = await contents.find();
  res.send(data);
});

router.post("/add", async (req, res) => {
  const content = new contents({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    const savedContent = await content.save();
    res.send(savedContent);
  } catch (error) {
    res.status(400).send(err);
  }
});

module.exports = router;
