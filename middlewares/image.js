const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const dotenv = require("dotenv");
dotenv.config();

var storage = new GridFsStorage({
  url: process.env.URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },

  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-${file.originalname}`;
      return filename;
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-${file.originalname}`,
    };
  },
});

var uploadFile = multer({
  storage,
}).single("file");
var uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;
