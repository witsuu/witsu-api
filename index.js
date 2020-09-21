const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const contentRoute = require("./routes/contentRoute");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute");
dotenv.config();

mongoose.connect(
  process.env.DB_HOST,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connect to db");
  }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/content", contentRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log("server running");
});
