const mongoose=require("mongoose");

const swipeSchema=new mongoose.Schema({
    sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver_id :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum: ['pending', 'accepted', 'rejected'],
        required:true
    },
},
{
    timestamps:true
}
);
const Swipe=mongoose.model("Swipe",swipeSchema);
module.exports=Swipe;