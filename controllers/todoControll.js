const ObjectId=require("mongodb").ObjectID;
const Todo=require("../models/todoModel");
const jwt=require("jsonwebtoken");

// Verify Login Token
const verifyToken=(token)=>{
  return jwt.verify(token,process.env.SECRET_KEY);
}

module.exports={
  // Create new todo
  add:(req,res)=>{
    const userId=verifyToken(req.body.token).id;
    const todoData=new Todo({
      user_id:ObjectId(userId),
      title:req.body.title,
      desc:req.body.desc,
      location:req.body.location,
      time:req.body.time
    });
    todoData.save().then((stats)=>{
      res.send(stats);
    }).catch((err)=>{
      res.send(err);
    });
  },
  // Retrieve all todos data based on login token
  all:(req,res)=>{
    const userId=verifyToken(req.body.token).id;
    Todo.find({
      user_id:ObjectId(userId)
    }).sort({createdAt:"desc"}).then((todos)=>{
      res.send(todos)
    }).catch((err)=>{
      res.send(err);
    });
  },
  // Retrieve unique todo data based on ObjectId
  findOne:(req,res)=>{
    Todo.findOne({
      "_id":ObjectId(req.body.todoId)
    }).then((todo)=>{
      res.send(todo);
    }).catch((err)=>{
      res.send(err);
    });
  },
  // Update specific todo data
  update:(req,res)=>{
    const userId=verifyToken(req.body.token).id;
    Todo.findOne({
      "_id":ObjectId(req.body.todoId)
    }).then((todo)=>{
      if(todo.user_id == userId){
        Todo.updateOne({
          "_id":ObjectId(req.body.todoId)
        },{
          title:req.body.title,
          desc:req.body.desc,
          location:req.body.location,
          time:req.body.time,
          status:req.body.status
        }).then((stats)=>{
          res.send({status:true});
        });
      }else{
        res.send({status:false,msg:"You don't have permission!"})
      }
    }).catch((err)=>{
      res.send(err);
    });
  },
  // Delete todo based on login token
  delete:(req,res)=>{
    const userId=verifyToken(req.body.token).id;
    Todo.findOne({
      "_id":ObjectId(req.body.todoId)
    }).then((todo)=>{
      if(todo.user_id == userId){
        Todo.remove({
          "_id":ObjectId(req.body.todoId)
        }).then((stats)=>{
          res.send({status:true});
        });
      }else{
        res.send({status:false,msg:"You don't have permission!"})
      }
    }).catch((err)=>{
      res.send(err);
    });
  }
};
