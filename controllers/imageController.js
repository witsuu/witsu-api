const upload = require('../middlewares/contentImage');

const uploadFile = async (req, res) => {
  try {
    await upload(req, res)

    if (req.file == undefined) {
      return res.send("You must select a file");
    }
    return res.send("File has been uploaded");
  } catch (error) {
    return res.send(`Error when trying upload image: ${error}`)
  }
}

module.exports = {
  uploadFile: uploadFile
};