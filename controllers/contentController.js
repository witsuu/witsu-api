const upload = require("../middlewares/image");
const { chunk, files } = require("../models/imgSchema");
const mongoose = require("mongoose");
const ContentSchema = require("../models/contentSchema");

const uploadFile = async (req, res) => {
  return res.send(req.protocol + "://" + req.get("host"));
  try {
    await upload(req, res);

    if (req.file == undefined) {
      return res.send("You must select a file");
    }

    const content = new ContentSchema({
      title: req.body.title,
      content: req.body.content,
      image: "http://localhost" + req.file.id,
    });

    const saved = await content.save();

    return res.send(saved);
  } catch (error) {
    return res.send(`Error when trying upload image: ${error}`);
  }
};

const getImage = async (req, res, next) => {
  const im = await chunk.findOne({
    files_id: req.params.id,
  });

  return res.send(im.data);
};

module.exports = {
  uploadFile: uploadFile,
  getImage: getImage,
};
