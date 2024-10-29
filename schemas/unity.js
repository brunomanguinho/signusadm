const {Schema} = require("mongoose");

const unitySchema = new Schema({
    user_id:{
        type: mongoose.ObjectId,
        ref: "User"
    },
    hospital_id:{
        type: mongoose.ObjectId,
        ref: "Hospital"
    },
    name: String,
    rooms:[
        {number: Number}
    ]
});

module.exports = unitySchema;