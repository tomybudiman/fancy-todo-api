const mongoose=require("mongoose").connect(process.env.DB_URL);
const Schema=mongoose.Schema;

const todoSchema=new Schema({
  user_id:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  title:String,
  desc:String,
  status:Boolean,
  location:String,
  date:Date,
  createdAt:{
    type:Date,
    default:new Date()
  }
});
const Todo=mongoose.model("Todo",todoSchema);

module.exports=Todo;
