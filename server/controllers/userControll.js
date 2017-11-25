const User=require("../models/userModel");
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
  User.count({
    email:data.email
  }).then((result)=>{
    if(result === 0){ // Jika email user belum terdaftar
      const userData=new User({
        name:data.name,
        email:data.email,
        fb_id:data.id
      });
      userData.save().then((stats)=>{
        callback(createToken(stats._id));
      });
    }else{ // Jika email user sudah terdaftar
      User.findOne({
        email:data.email
      }).then((user)=>{
        callback(createToken(user._id));
      });
    }
  }).catch((err)=>{
    callback({status:false,msg:"Query error!"});
  });
}

module.exports={
  add:(req,res)=>{ // Validate FB Token & add user to database
    FB.setAccessToken(req.headers.accesstoken);
    FB.api(req.headers.userid,{fields:["name","email","picture"]},(response)=>{
      if(!response || response.error){
        res.send({status:false,msg:response});
      }else{
        insertUserDB(response,(result)=>{
          res.send({status:true,token:result});
        });
      }
    });
  },
  verify:(req,res)=>{ // Verify login token from local storage
    const userId=verifyToken(req.headers.token).id;
    if(userId){ // Jika verifikasi token berhasil
      User.findOne({
        "_id":ObjectId(userId)
      }).then((user)=>{
        if(user){ // Jika data user ditemukan
          res.send({status:true,user:user});
        }else{ // Jika data user tidak ditemukan
          res.send({status:false,msg:"User not found!"});
        }
      }).catch((err)=>{
        res.send({status:false,msg:err});
      });
    }else{ // Jika verifikasi token gagal
      res.send({status:false,msg:"Invalid token!"});
    }
  }
};
