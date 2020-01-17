const express = require("express");
const app = express();
const mongoose = require("mongoose");


//connect to mongodb
mongoose
  .connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@dswhatever`, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.get("/", (req, res) => res.json({ status: 200, message: "hello" }));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));