const express = require('express');
const router = express.Router();
const User = require('../models/user');

router
.post('/',async (req,res) => {
    try{
        const newUser = new User(req.body);
        const savedUser=await newUser.save();
        res.status(201).json(savedUser);

    }catch(err){
        res.status(400).json({error : err });
    }

});
module.exports=router;