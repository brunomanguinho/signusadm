const dao = require("../dao/conn");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const mongoose = dao.conn;
const userDAO = require("../dao/userDAO");


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    profile: {
        type: String,
        enum: ["Administrador"]
    },
});

userSchema.plugin(passportLocalMongoose);

// const User = new mongoose.model("User", userSchema);

// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

module.exports.register = 
    async (data)=>{
        try{
            let username = data.username;
            let password = data.password;
            let confirmedPassword = data.confirmedPassword;
        
            if (
                ( (!username) || (!password) || (!confirmedPassword) ) ||
                ( (username === "") && (password === "") && (confirmedPassword === "") )
               )
            {
                return {success: false, message: "Está faltando um ou mais argumentos"};
            } else if (password !== confirmedPassword) {
                return {success: false, message: "Senhas são divergentes..."};
            } else {
                let user = await userDAO.registerUser(username, password, data.profile);
    
                if (user !== null){
                    return ({success: true, message: "Usuário registrado com sucesso!", data: user});
                } else {
                    return ({success: false, message: "Erro ao criar usuário", data: user})
                }
            }
        } catch(err){
            if (err.code === 11000) {
                return ({success: false, message: `O usuário ${err.keyValue.username} já está registrado`, data: err})
            } else {
                return ({success: false, message: "Erro desconhecido ao criar usuário", data: err})
            }
        }
    }

module.exports.login = 
    async(data)=>{
        let user = await userDAO.authenticate(data.username, data.password);

        return user;
    }

// module.exports.User = User;

module.exports = userSchema;