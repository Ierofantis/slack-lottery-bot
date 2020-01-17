const express = require("express");
const app = express();

require('dotenv').config();
const configuration = require('./config');
const logger = require('./app/helpers/logger');
const routes = require('./app/http/routes');


app.get("/", (req, res) => res.json({ status: 200, message: "hello" }));

app.use('/api', routes.api);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));