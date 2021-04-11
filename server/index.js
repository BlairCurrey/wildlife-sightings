// module imports
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')

// load environment variables
require("dotenv").config();

// import routes and database
const routes = require('./routes/index');
const database = require('./database/index');

// initialize express app
const app = express();

// use middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/', routes);
app.use(express.urlencoded({ extended: true }));

// Listen on port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
