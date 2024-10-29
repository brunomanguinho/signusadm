class Hospital{
    constructor(conn){
        this.mongoose = conn;

        const hospitalSchema = new mongoose.Schema({
            name: String,
            slogan: String,  
            logoPath: String,
            createDate: Date
        });

        const Hospital = new mongoose.model("Hospital", {hospitalSchema});
    };
}

module.exports = Hospital;