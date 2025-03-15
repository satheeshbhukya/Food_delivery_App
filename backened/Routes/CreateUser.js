const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs');
const { body, validationResult } = require("express-validator");
const jwtSecret="MynameisChandra"

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "this message will print when there is error").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
      const salt=await bcrypt.genSalt(10);  // bcrypt function are async in nature(inbuilt),10 is a variable (u can use any umber)
      let secPassword=await bcrypt.hash(req.body.password,salt) 
    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      // u can use this way or u can use (create user and .save() function)
      return res.json({ success: true });
    } catch (err) {
      console.log(err);
      return res.json({ success: false });
    }
  }
);
router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "this message will print when there is error").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;

    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Invalid email" });
      }
      const pwdcompare=await bcrypt.compare(req.body.password,userData.password)
      if (!pwdcompare) {
        return res.status(400).json({ errors: "Invalid password" });
      }
      const data={  //should be a object
        user:{
          id:userData.id
        }
      }
       const authToken=jwt.sign(data,jwtSecret);
      return res.json({ success: true ,authToken:authToken});
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);
module.exports = router;
