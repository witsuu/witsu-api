const {
  binary
} = require("@hapi/joi");
const mongoose = require("mongoose");

const chunkSchema = new mongoose.Schema({
  files_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
});

const filesSchema = new mongoose.Schema({
  filename: {
    type: String,
  },
  // data: {
  //   type: Buffer
  // },
  contentType: {
    type: String,
  },
  img: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "photos.chunks",
  }]
})


const chunk = mongoose.model("photos.chunks", chunkSchema);
const files = mongoose.model("photos.files", filesSchema);

module.exports = {
  chunk: chunk,
  files: files,
};