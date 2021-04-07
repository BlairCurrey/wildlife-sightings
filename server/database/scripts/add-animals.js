// const mongoose = require('mongoose');
const path = require('path');
require("dotenv").config({
    path: path.resolve(__dirname, "../../../", ".env")
});

// async function connect(url, options){
//     try {
//         connection = await mongoose.connect(url, options);
//         console.log("Connected to database");
//         return connection
//     } catch (error) {
//         console.log(error);
//     }
// }

// url = process.env.DATABASE_URL;
// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// };
// console.log(url, options)
// connection = connect(url, options);
