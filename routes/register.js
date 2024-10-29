const express = require("express");
const router = express.Router();
const {register} = require("../models/users");

router.post("/", async (req, res)=>{
    let data = req.body;
    register(data);
})

module.exports = router;