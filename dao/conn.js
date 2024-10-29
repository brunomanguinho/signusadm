const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.CONNSTRING);

exports.conn = mongoose;