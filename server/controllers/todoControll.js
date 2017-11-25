const ObjectId=require("mongodb").ObjectID;
const Todo=require("../models/todoModel");
const jwt=require("jsonwebtoken");

// Verify Login Token
const verifyToken=(token)=>{
  return jwt.verify(token,process.env.SECRET_KEY);
}

module.exports={
  // Retrieve all todos data based on login token => Beres
  all:(req,res)=>{
    const userId=verifyToken(req.headers.token).id;
    Todo.find({
      user_id:ObjectId(userId)
    }).sort({createdAt:"desc"}).then((todos)=>{
      res.send(todos)
    }).catch((err)=>{
      res.send(err);
    });
  },
  // Create new todo => Beres
  add:(req,res)=>{
    const userId=verifyToken(req.headers.token).id;
    const todoData=new Todo({
      user_id:ObjectId(userId),
      title:req.body.title,
      desc:req.body.desc,
      location:req.body.location,
      status:req.body.status
    });
    todoData.save().then((stats)=>{
      res.send(stats);
    }).catch((err)=>{
      res.send(err);
    });
  },
  // Retrieve unique todo data based on ObjectId => Beres
  findOne:(req,res)=>{
    const userId=verifyToken(req.headers.token).id;
    Todo.findOne({
      "_id":ObjectId(req.params.todoId)
    }).then((todo)=>{
      res.send(todo);
    }).catch((err)=>{
      res.send(err);
    });
  },
  // Update specific todo data => Beres
  update:(req,res)=>{
    const userId=verifyToken(req.headers.token).id;
    Todo.findOne({
      "_id":ObjectId(req.body.todoId)
    }).then((todo)=>{
      if(todo && todo.user_id == userId){ // Jika userId todo dengan token sama
        Todo.updateOne({
          "_id":ObjectId(req.body.todoId)
        },{
          title:req.body.title,
          desc:req.body.desc,
          location:req.body.location,
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
    const userId=verifyToken(req.headers.token).id;
    const todoId=req.params.id;
    Todo.findOne({
      "_id":ObjectId(todoId)
    }).then((todo)=>{
      if(todo){ // Jika todo ditemukan
        Todo.deleteOne({
          "_id":ObjectId(todoId)
        }).then((stats)=>{
          res.send({status:true,data:stats});
        });
      }else{
        res.send({status:false,msg:"Todo tidak ditemukan!"});
      }
    }).catch((err)=>{
      res.send(err);
    });
  }
};
