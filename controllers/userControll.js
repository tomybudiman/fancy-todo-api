const User=require("../models/userModel");
const randomstring=require("randomstring");
const ObjectId=require("mongodb").ObjectID;
const nodemailer=require("nodemailer");
const jwt=require("jsonwebtoken");
const FB=require("fb");

// Create Login Token
const createToken=(data)=>{
  return jwt.sign({id:data},process.env.SECRET_KEY);
}

// Verify Login Token
const verifyToken=(token)=>{
  return jwt.verify(token,process.env.SECRET_KEY);
}

// Insert or retrieve user data
const insertUserDB=(data,callback)=>{
  const random=randomstring.generate({length:20,capitalization:"lowercase"});
  User.count({
    email:data.email
  }).then((result)=>{
    if(result === 0){
      const userData=new User({
        name:data.name,
        email:data.email,
        verification:random,
        fb_id:data.id
      });
      userData.save().then((stats)=>{
        callback({status:true,data:createToken(stats._id)});
      });
    }else{
      User.findOne({
        email:data.email
      }).then((user)=>{
        callback({status:true,data:createToken(user._id)});
      });
    }
  }).catch((err)=>{
    callback({status:false,msg:"Query error!"});
  });
}

module.exports={
  add:(req,res)=>{
    FB.setAccessToken(req.body.accessToken);
    FB.api(req.body.userID,{fields:["name","email"]},(response)=>{
      if(!response || response.error){
        res.send({status:false,msg:"Gagal memproses token Facebook!"});
      }else{
        insertUserDB(response,(result)=>{
          res.send(result);
        });
      }
    });
  },
  verify:(req,res)=>{
    const userId=verifyToken(req.body.token).id;
    User.findOne({
      "_id":ObjectId(userId)
    }).then((user)=>{
      if(user == null){
        res.send({status:false,msg:"User not found!"});
      }else{
        res.send({status:true,data:user});
      }
    }).catch((err)=>{
      res.send({status:false,msg:"Error on query!"});
    });
  }
};
