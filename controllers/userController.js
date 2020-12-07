const Users = require('../models/userSchema');
const {
  loginValidation,
  registerValidation
} = require('../validation/userValidation');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
  const {
    error
  } = loginValidation(req.body);
  if (
    error
  ) return res.status(400).send(error.details[0].message);

  //Checking Email Valid
  const email = await Users.findOne({
    email: req.body.email
  });
  if (!email) return res.status(404).send("Email Salah!");

  //Checking Password valid
  const passwd = await bcrypt.compare(req.body.password, email.password);
  if (!passwd) return res.status(404).send('Password Salah!');

  //If Email and Pass Valid
  res.send('Login Berhasil');
}

const handleRegister = async (req, res) => {
  const {
    error
  } = registerValidation(req.body);
  if (
    error) return res.status(400).send(error.details[0].message);

  //Check If Email Already Exist
  const emailExist = Users.findOne({
    email: req.body.email
  });
  if (emailExist) return res, status(400).send('Email Sudah Ada');

  //Password Hashed
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);

  //Save New User
  const user = new Users({
    nama: req.body.nama,
    email: req.body.email,
    password: hashedPass,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
}

const getAllUser = async (req, res) => {
  const dataUser = await Users.find();
  res.send(dataUser);
}

module.exports.handleLogin = handleLogin;
module.exports.handleRegister = handleRegister;
module.exports.getAllUser = getAllUser;