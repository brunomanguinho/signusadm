const u = require("../schemas/users");

module.exports.registerUser = 
    async (username, password, profile)=>{
        let user = new u.User({
            username: username,
            profile: profile
        })

        await user.setPassword(password);
        await user.save();

        return user;
    }

module.exports.authenticate = 
    async(username, password)=>{
        let user = await u.User.authenticate()(username, password);

        return user.user;
    }