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


app.get("/api/todo",async (req, res) => {
  
  const todos = await Todo.find()
  res.json(todos);
  
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

  await Todo.create(newtodo)
  console.log(Todo,"todo");
  res.json({
    message : "data added"
  });
 
});



// app.put("/api/todo", (req, res) => {
//   const { editedInputValues, TodoId } = req.body;

//   const wanteddata = ["editedInputValues", "TodoId"];

//   checkwanteditems(wanteddata, req.body, res);

//   const index = todos.findIndex((todo) => todo.id === TodoId);

//   todos[index].TodoList = editedInputValues[TodoId];
//   res.json(todos);
// });




// app.put("/api/todos/complete", (req, res) => {
//   const { TodoId } = req.body;
//   const wanteddata = ["TodoId"];
//   checkwanteditems(wanteddata, req.body, res);
//   const index = todos.findIndex((todo) => todo.id === TodoId);

//   todos[index].status = !todos[index].status;

//   console.log(todos, "===after status");
//   res.json(todos);
// });



// app.delete("/api/todo", (req, res) => {
//   const { todosArray, TodoId } = req.body;
//   const wanteddata = ["todosArray", "TodoId"];
//   checkwanteditems(wanteddata, req.body, res);
//   const newarray = todosArray.filter((data) => data.id !== TodoId);

//   todos = newarray;
//   res.json(todos);
//   console.log(todos, "==main todos array");
// });


 
const PORT = process.env.PORT || 3005
app.listen(PORT,()=>console.log(`server started in port ${PORT}`))
