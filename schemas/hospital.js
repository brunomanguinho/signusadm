const {Schema} = require("mongoose");

const hospitalSchema = new Schema({
    name: String,
    slogan: String,  
    logoPath: String,
    createDate: Date
});

module.exports = hospitalSchema;