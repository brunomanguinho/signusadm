const express = require("express");
const router = express.Router();
const u = require("../schemas/users")
const Database = require("../schemas/databases");
const scripts = require("../scripts");

router.get("/", async (req, res)=>{
    const user = await u.User.findOne({
        _id: req.session.user
    });

    if (user !== null){
        const DB = await Database.find({});
        res.render("index", {data: DB});
    } else {res.redirect("/login")}
});

router.get("/logoff", (req, res)=>{
    req.logout;
    req.session.userId = null,
    req.session.profile = null;

    res.redirect("/login");
});

router.get("/criarbase", (req, res)=>{
    res.render("createdb");
});

router.post("/criarbase", async (req, res)=>{
    // let db = new Database({
    //     name: req.body.name,
    //     dbname: req.body.dbname,
    //     dbroute: req.body.dbroute
    // });

    // await db.save();

    //create db

    console.log(req.body);

    scripts.createDataBase({name: req.body.name, dbname: req.body.dbname}, req.body.unity, req.body.user, req.body.room)

    res.redirect("/");
})

module.exports = router;