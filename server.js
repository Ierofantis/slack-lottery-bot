const express = require("express");
const app = express();
const mongoose = require("mongoose");


//connect to mongodb
mongoose
  .connect(`mongodb://heroku_skf9lr6x:nsqnc9a1liulkjoteg9tg2e93t@ds263848.mlab.com:63848/heroku_skf9lr6x`)
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.get("/", (req, res) => res.json({ status: 200, message: "hello" }));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
