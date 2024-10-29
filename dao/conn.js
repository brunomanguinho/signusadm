const mongoose = require("mongoose");
require("dotenv").config();
mongoose.createConnection(process.env.CONNSTRING);

exports.conn = mongoose;