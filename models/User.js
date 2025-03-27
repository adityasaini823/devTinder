const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    bio:{
        type:String
    },
    location:{
        type:String
    },
    dob:{
        type:Date,
        required:true
    },
    profilePicture: { 
       type:String,
       default:"https://i.pinimg.com/474x/27/5f/99/275f99923b080b18e7b474ed6155a17f.jpg?nii=t"
    },
    profileImages:{
        type:[String],
        default:[]
    },
    role:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    },
},{
    timestamps:true
});
const User=mongoose.model('User',userSchema);
// User.createIndex({username:1});
module.exports=User;