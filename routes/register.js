const express = require("express");
const router = express.Router();
const {register} = require("../schemas/users");

router.post("/", async (req, res)=>{
    let data = req.body;
    register(data);
})

module.exports = router;