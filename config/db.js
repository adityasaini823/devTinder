const mongoose=require('mongoose');
const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    }catch(err){
        console.log(err);
    }
}
module.exports=connectDb;