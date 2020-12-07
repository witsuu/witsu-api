const route = require("express").Router();
const {
  handleLogin,
  handleRegister,
  getAllUser,
} = require('../controllers/userController');

// route get all users
route.get("/get", getAllUser);

// route register
route.post("/signup", handleRegister);

// route login user
route.post("/login", handleLogin);

module.exports = route;