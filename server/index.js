const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')

require("dotenv").config();

const routes = require('./routes/index');
const database = require('./database/index');

const app = express();
const port = process.env.PORT || 8080;

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/', routes);
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Listening on port ${port}`));
