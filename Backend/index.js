const express = require("express");
const app = express();
const { checkwanteditems } = require("./utlities");
const cors = require("cors");
const connectdb = require("./config/db");
require('dotenv').config()
const Todo = require("./model/todomodel")
app.use(cors())
app.use(express.json());

connectdb()


// let todos = [];


app.get("/api/todo", async (req, res) => {
  
  const todos = await Todo.find()
  res.json(todos);
  console.log(todos);
});



app.post("/api/todo", async (req, res) => {
  const { userInputData } = req.body;
  console.log(req.body, "body");

  // const wanteddata = ["userInputData"];

  // checkwanteditems(wanteddata, req.body, res);

  // console.log(wanteddata, "==wanteddatafunc");

  const newtodo = {
    todos : userInputData,
    status: false,
  }

  const postdata = await Todo.create(newtodo)
  res.json(postdata);
  
});



app.put("/api/todo", async (req, res) => {
  const { editedvalue, TodoId } = req.body;


 const fields = {
   todos : editedvalue,
   status : false
 }
 console.log("TodoId",TodoId);
 console.log("editedInputValues:", editedvalue);


  const updatedata = await Todo.findByIdAndUpdate(TodoId,fields, { new: true });
  console.log(updatedata,"updateddata");
  res.json(updatedata)
});




app.put("/api/todos/complete", async (req, res) => {
  const { TodoId } = req.body;


  const todo = await Todo.findById(TodoId)

  todo.status = !todo.status

  const updatedata = await todo.save()
   
  
res.json(updatedata)
  console.log("aaaaaa",updatedata,"aaaaaa");
});



app.delete("/api/todo", async (req, res) => {
  const { TodoId } = req.body;

  // const wanteddata = ["todosArray", "TodoId"];
  // checkwanteditems(wanteddata, req.body, res);
  // const newarray = todosArray.filter((data) => data.id !== TodoId);

  // todos = newarray;
  // res.json(todos);
  // console.log(todos, "==main todos array");
   
  const deleted = await Todo.findByIdAndDelete(TodoId)

   res.json(deleted)
   
});



 
const PORT = process.env.PORT || 3005
app.listen(PORT,()=>console.log(`server started in port ${PORT}`))
