const mongoose  = require("mongoose")

const skippedSchema=new mongoose.Schema({
    sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    skipped_at:{
        type:Date,
        default:Date.now()
    }
});
skippedSchema.index({ skipped_at: 1 }, { expireAfterSeconds: 3600  });
const Skipped=new mongoose.model("Skipped",skippedSchema);
module.exports=Skipped;