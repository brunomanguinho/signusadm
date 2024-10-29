const user = require("./schemas/users");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


module.exports.createUserAdm = 
    async ()=>{
        try{
            let u = await user.User.findOne({
                username: "adm",
                profile: "Administrador"
            }).exec();

            console.log("user return", u);

            if ( (!u) || (u == null) ){
                let register = await
                    user.register({
                        username: "adm",
                        password: "123",
                        confirmedPassword: "123",
                        profile: "Administrador"
                    });

                return register.data;
            } else{
                return u;
            } 
            
        }catch(err){
            console.log("error creating user");
            throw err;
        }
    }

module.exports.createHospital = 
    async(name)=>{
        // const hospitalSchema = new mongoose.Schema({
        //     name: String,
        //     slogan: String,  
        //     logoPath: String,
        //     createDate: Date
        // });

        // const Hospital = new mongoose.model("Hospital", {hospitalSchema});

        // let h = new Hospital({
        //     name: name,
        //     createDate: new Date()
        // });

        // await h.save();

        // return h;
    }

module.exports.createUnity = 
    async(unity)=>{
        // const unitySchema = new mongoose.Schema({
        //     user_id:{
        //         type: mongoose.ObjectId,
        //         ref: "User"
        //     },
        //     hospital_id:{
        //         type: mongoose.ObjectId,
        //         ref: "Hospital"
        //     },
        //     name: String,
        //     rooms:[
        //         {number: Number}
        //     ]
        // });

        // const Unity = new mongoose.model("Unity", unitySchema);
        
        // let u = await this.createUser(unity.username, "Plantonista");

        // if (u !== null) {
        //     let rooms = [];
        //     for(let i=1; i<=unity.rooms; i++){
        //         rooms.push({number: i});
        //     }

        //     let un = new Unity({
        //         user_id: u._id,
        //         hospital_id: unity.hospital._id,
        //         name: unity.name,
        //         rooms: rooms
        //     });

        //     await un.save();
        // }
    }

module.exports.createUser = 
    async(username, profile)=>{
        const userSchema = new mongoose.Schema({
            username: String,
            password: String,
            profile: {
                type: String,
                enum: ["Admiministrador", "Coordenador", "Diarista", "Plantonista"]
            },
        });
        
        userSchema.plugin(passportLocalMongoose);
        
        const User = new mongoose.model("User", userSchema);
        
        passport.use(User.createStrategy());
        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());

        let u = new User({
            username: username,
            profile: profile,
        });

        await u.setPassword("123");
        await u.save();

        return u;
    }

module.exports.createDataBase = 
    async(database, unities, users, rooms)=>{
        console.log("inside script", database.dbname);
        await mongoose.createConnection(`mongodb://127.0.0.1:27017/${database.dbname}`).asPromise();
        console.log("mongoose connected", console.log(mongoose));
        try{
            const hospital = await this.createHospital(database.name);

            if (hospital !== null){
                if ( (unities) && (unities instanceof Object) ){
                    unities.forEach(async(unity, i) => {
                        await this.createUnity({
                            hospital: hospital,
                            name: unity, 
                            username: users[i], 
                            rooms: rooms[i]
                        })
                    });
                }
            }
        }catch(err){
            console.log("Erro ao criar hospital", err);
            throw err;
        }
        
    }
    