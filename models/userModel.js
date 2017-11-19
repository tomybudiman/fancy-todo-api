const mongoose=require("mongoose").connect(process.env.DB_URL);
const Schema=mongoose.Schema;

const userSchema=new Schema({
  name:String,
  email:String,
  verification:String,
  verified:{
    type:Boolean,
    default:false
  },
  fb_id:String,
  createdAt:{
    type:Date,
    default:new Date()
  }
});
const User=mongoose.model("User",userSchema);

module.exports=User;
