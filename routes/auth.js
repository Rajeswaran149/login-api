const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../models/user.js')

const router = express.Router();

router.post('/signup' ,async (req,res) => {
    try{
       const hashedPassword = await bcrypt.hash(req.body.password , 10);
       const user = new User ({
           email : req.body.email,
           password : hashedPassword
       })
       await user.save();
       res.status(201).json({msg : 'user registered successfully'});
    } catch (error) {
       console.error('error registering user:',error);
       res.status(500).json({err : 'internal server error'})
    }
   
   })

router.post('/login' , async (req , res) => {
  try {
    const {email,password} = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({msg : 'invalid email'});
    }
    const match = await bcrypt.compare( password , user.password );

    if (!match) {
        return res.status(400).json({msg : 'invalid password'})
    }
    const token = jwt.sign({userId: user._id},process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error('login error:' , error);
    res.status(500).json({msg: 'internal server error'});
  }
});

module.exports = router