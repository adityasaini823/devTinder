const jwt=require('jsonwebtoken');
const User=require("../models/User");
const userValidator=async(req,res,next)=>{
    try{
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided or invalid format.",
            });
        }

        const token = authHeader.split(" ")[1]; // Extract the token safely

        const decoded=jwt.verify(token,process.env.ACCESS_SECRET);
        if(!decoded || !decoded.username){
            return res.status(403).json({
                success:false,
                message:'Access denied. Invalid token.',
            });
        }
        const user=await User.findOne({username:decoded.username}).select("-password");
        if(!user){
        return res.status(403).json({
                success:false,
                message:'Access denied. User not found.',
            });
        }
        req.user=user;
        next();
    }
    catch (error) {
        if(error.name==="TokenExpiredError"){
            return res.status(401).json({
                success:false,
                message:'Access denied. Token expired.',
            });
        }
        return res.status(401).json({
            success: false,
            message: "Invalid token or expired session.",
            error: error.message
        });
    }
}
module.exports=userValidator;