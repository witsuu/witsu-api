const route = require("express").Router();
const users = require("../models/userSchema");

route.get("/get", async (req, res) => {
  const dataUser = await users.find();
  res.send(dataUser);
});

module.exports = route;
