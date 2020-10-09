const route = require("express").Router();
const users = require("../models/userSchema");
const bcrypt = require("bcrypt");
const {
  registerValidation,
  loginValidation,
} = require("../validation/userValidation");

// route get all users
route.get("/get", async (req, res) => {
  const dataUser = await users.find();
  res.send(dataUser);
});

// route get by id user
route.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  const dataUser = await users.findById({ _id: id });
  res.send(dataUser);
});

// route register
route.post("/signup", async (req, res) => {
  // validate data input
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if email already exist
  const emailExist = await users.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already Exist");

  // hashed password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Save User Account
  const user = new users({
    nama: req.body.nama,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

route.post("/login", async (req, res) => {
  // validate data input for login
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check email valid
  const email = await users.findOne({ email: req.body.email });
  if (!email) return res.status(404).send("email wrong!");

  // check password valid
  const passwd = await bcrypt.compare(req.body.password, email.password);
  if (!passwd) return res.status(404).send("password wrong!");

  // email and pass true
  res.send("login successfull!");
});

module.exports = route;
