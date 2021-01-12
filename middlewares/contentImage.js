const util = require('util');
const multer = require('multer');
const storage = require('multer-gridfs-storage');

var storages = new storage({
  url: process.env.DB_HOST,
  options: {
    useNewUrlParsel: true,
    useUnifiedTopology: true
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
  storage: storage
}).single();
var uploadFileMiddleware = util.promisify(uploadFile);

module.export = uploadFileMiddleware;