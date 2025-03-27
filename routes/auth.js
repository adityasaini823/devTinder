require('dotenv').config();
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const upload = require("../middleware/multer");
const User = require("../models/User");


const userSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "any.required": "First name is required."
  }),
  lastName: Joi.string().required().messages({
    "any.required": "Last name is required."
  }),
  bio: Joi.string().max(300).optional().messages({
    "String.max": "bio is limited to 300 characters only"
  }),
  username: Joi.string().alphanum().min(6).max(30).required().messages({
    "string.alphanum": "Username must contain only letters and numbers.",
    "string.min": "Username must be at least 6 characters.",
    "string.max": "Username must not exceed 30 characters.",
    "any.required": "Username is required."
  }),
  dob: Joi.date().max(dayjs().subtract(15, 'year').toDate()).required()
    .messages({
      "date.max": "User must be at least 15 years old.",
      "any.required": "Date of birth is required."
    }),
    location:Joi.string().optional(),
  role: Joi.string().optional(), // Optional 
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format.",
    "any.required": "Email is required."
  }),
  password: Joi.string().min(8).max(50).required().messages({
    "string.min": "Password must be at least 8 characters.",
    "string.max": "Password must not exceed 50 characters.",
    "any.required": "Password is required."
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match.",
    "any.required": "Confirm password is required."
  })
});

router.post("/signup",  upload.single('profilePicture'),async (req, res) => {
  try {
    // console.log(JSON.stringify(req.body));
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: error.details.map(err => err.message)
      });
    }
    const profilePicturePath=req.file?req.file.path : null;
    const { firstName, lastName, username,role, dob, email, password } = req.body;
    //check if already user exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username or Email already taken."
      });
    }
    //  Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Save User to Database
    const newUser = new User({
      firstName,
      lastName,
      username,
      role,
      profilePicture:profilePicturePath,
      dob,
      email,
      password: hashedPassword
    });

    await newUser.save();

    //  Generate Tokens
    const refreshToken = jwt.sign({ username }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
    const accessToken = jwt.sign({ username }, process.env.ACCESS_SECRET, { expiresIn: "15m" });

    //  Set Refresh Token in Cookie
    const cookieOptions = {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
      httpOnly: true,
      secure: true, // Set to `true` in production
      sameSite: "Strict"
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);

    //  Send Response
    return res.status(201).json({
      success: true,
      message: "Signup successful",
      data: {
        accessToken,
        expiresIn: 900 // 15 minutes
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
      error: error.message
    });
  }
});
router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid username or password"
        });
      }
  
      //  Check if the password is correct
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({
          success: false,
          message: "Invalid username or password"
        });
      }

      //  Generate JWT Tokens
      const refreshToken = jwt.sign({ username }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
      const accessToken = jwt.sign({ username }, process.env.ACCESS_SECRET, { expiresIn: "15m" });
  
      //  Set Secure Refresh Token in HTTP-Only Cookie
      res.cookie("refreshToken", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookie only in production
      });
  
      // Send Response with Access Token
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          accessToken,
          expiresIn: 900 // 15 minutes
        }
      });
  
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Server error, please try again later",
        error: err.message
      });
    }
  });
router.get("/refresh",async(req,res)=>{
    try {
      const refreshToken=req.cookies.refreshToken;
      // console.log(refreshToken);
      if(!refreshToken){
        return res.status(401).json({
          success:false,
          message:"refresh token not found",
          error:"unauthorized"
        })
      }
      jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json({ success:false,message:"invalid refresh-token",error: 'Invalid refresh token' });
        const newAccessToken = jwt.sign({username:user.username},process.env.ACCESS_SECRET,{expiresIn:'15m'});
        res.json({ accessToken: newAccessToken });
    });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Server error, please try again later",
            error: err.message
        });
    }
});
router.get("/logout",(req,res)=>{
  res.clearCookie("refreshToken");
  res.json({
    success:true,
    message:"successfully logged out"
  })
});
// router.get('/test',(req,res)=>{return res.status(200).json({msg:"working good for now"})});
module.exports=router;