const app=require("express")();
const parser=require("body-parser");
const env=require("dotenv").config();
const cors=require("cors");
// Config
app.use(parser.urlencoded({extended:false}));
app.use(parser.json());
app.use(cors());
// Main
const user=require("./routes/user");
app.use("/user",user);

const todo=require("./routes/todo");
app.use("/todo",todo);

app.listen(3000,()=>{
  console.log("Server started! Listenning on port 3000");
});
