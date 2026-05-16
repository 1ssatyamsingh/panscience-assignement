const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const cookieparser = require("cookie-parser");

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieparser());

app.get("/",(req,res) => {
  res.send("api running");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });