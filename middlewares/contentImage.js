const util = require('util');
const multer = require('multer');
const storage = require('multer-gridfs-storage');
const dotenv = require('dotenv');
dotenv.config();

var storages = new storage({
  url: process.env.URL,
  options: {
    useNewUrlParser: true
  },

  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `$`
    }
  }

});

var uploadFile = multer({
  storage: storages
}).single();
var uploadFileMiddleware = util.promisify(uploadFile);

module.export = uploadFileMiddleware;