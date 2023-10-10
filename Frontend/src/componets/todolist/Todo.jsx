import { useState, useEffect } from "react";
import "./todo.css";
import { Todoinput } from "../Todoinput/Todoinput";
import axios from "axios";

/*-------------------------------------////-----------------------------------*/

export const Todo = () => {
  /-----------------------States----------------------/;

  const [userInputData, setUserInputData] = useState("");
  const [todosArray, setTodosArray] = useState([]);
  const [inputSectionStatus, setInputSectionStatus] = useState(false);
  const [editButtonStatus, setEditButtonStatus] = useState(null);
  const [editedInputValues, setEditedInputValues] = useState({});

  const HandleFetchInput = (event) => {
    setUserInputData(event.target.value);
  };

  /--------------------------------------------------------------------------/;

  //initial call//

  useEffect(() => {
    Fetchtodosfromserver();
  }, []);

  const Fetchtodosfromserver = async () => {
    const respone = await axios("http://localhost:3000/api/todo");
    setTodosArray(respone.data);
    console.log(todosArray, "Main array");
    
  };

  //ADD NEW TODO//

  const AddTodo = async () => {
    if (userInputData === "") {
      setInputSectionStatus(true);
      setTimeout(() => {
        setInputSectionStatus(false);
      }, 800);
    } else {
      const respone = await axios("http://localhost:3000/api/todo", {
        method: "POST",
        data: {
          userInputData: userInputData,
        },
      });
        
      const newtodo = respone.data
      
      if (respone.data) {
        setTodosArray((prev)=>
         [ ...prev, newtodo] )

        Fetchtodosfromserver();
        setUserInputData("");
        
      }
    }
  };

  /-------------------------------------------------------------------------------/;
  //TODO DELETE FUNCTION//

  const HandleDelete = async (TodoId) => {
     await axios("http://localhost:3000/api/todo", {
      method: "DELETE",
      data: {
        TodoId: TodoId,
      },
    });
    Fetchtodosfromserver()
  };
  /---------------------------------------------------------------------------------------/;
  //TODO COMPLETE

  const HandleComplete = async (TodoId) => {
    const respone = await axios("http://localhost:3000/api/todos/complete", {
      method: "PUT",
      data: {
        TodoId: TodoId,
      },
    });
    console.log(respone.data, "data ");
    const findtotostatus = todosArray.findIndex((todo)=> todo._id === TodoId)
     if (findtotostatus !== -1){
       
      const updatedTodosArray = [...todosArray]
  
      updatedTodosArray[findtotostatus].status = respone.data.status
    setTodosArray(updatedTodosArray);
     }
  };

  /-------------------------------------------------------------------------------------/;
  //TODO EDIT SECTION//

  const HandleEdit = async (TodoId) => {
    if (editButtonStatus === TodoId) {
      setEditButtonStatus(null);
    } else {
      setEditButtonStatus(TodoId);
      const userclikedtodo = todosArray.find(
        (Tododata) => Tododata._id === TodoId
      );
      setEditedInputValues({
        [TodoId] : userclikedtodo.todos  })
    }
    
  };

  /-----------------------------------------------------------------------------------/;
  //TODO EDIT CANCEL SECTION//

  const HandleCancel = () => {
    setEditButtonStatus("");
    setUserInputData("");
  };

  /--------------------------------------------------------------------------------------/;
  //TODO EDIT SAVE SECTION//

  const HandleSave = async (TodoId) => {
    const editedvalue = editedInputValues[TodoId]
    console.log(editedvalue,"value?");
    const respone = await axios("http://localhost:3000/api/todo", {
      method: "PUT",
      data: {
        TodoId: TodoId,
        editedvalue:editedvalue,
      },
    });
    console.log(respone.data, "==response data");
    
    const todoIndex = todosArray.findIndex((todo) => todo._id === TodoId);

  if (todoIndex !== -1) {
    
    const updatedTodo = respone.data.todos
    const updatedTodosArray = [...todosArray];
    updatedTodosArray[todoIndex].todos = updatedTodo;

   
    setTodosArray(updatedTodosArray);
  }
     
    setEditButtonStatus("");
  };
   
  /---------------------------------------------------------------------------------------/;
  // TODO CHANGED VALUE HANDLING SECTION //

  const HandleInputChange = (TodoId, newValue) => {
    setEditedInputValues((prevInputValues) => ({
      ...prevInputValues,
      [TodoId]: newValue,
    }));
  };
  /--------------------------------------------------------------------------------------------/;
  return (
    <div className="main-div">
      <div className="background">
        <div className="back-div"></div>
        <div className="front-div">
          <h1>Todo List</h1>
          <Todoinput
            HandleFetchInput={HandleFetchInput}
            AddTodo={AddTodo}
            userInputData={userInputData}
          />
          {/* ----------------------------------------------------------------- */}
          {todosArray.map((Tododata) => (
            <div className="list-container" key={Tododata._id}>
              {/*----------------------------------------------------------------*/}

              {editButtonStatus != null && editButtonStatus === Tododata._id ? (
                <div className="error-maindiv">
                  <div className="input-div2">
                    <input
                      type="text"
                      value={editedInputValues[Tododata._id] || ""}
                      onChange={(event) =>
                        HandleInputChange(Tododata._id, event.target.value)
                      }
                    />
                  </div>
                  <div className="save-btn">
                    <button onClick={() => HandleSave(Tododata._id)}>
                      Save
                    </button>
                  </div>
                  <div className="cancel-btn">
                    <button onClick={HandleCancel}>Cancel</button>
                  </div>
                </div>
              ) : (
                // -------------------------------
                //  ------------------------------
                <>
                  <div
                    onClick={() => HandleComplete(Tododata._id)}
                    id={Tododata.status ? "listcomplete" : ""}
                    className="text"
                  >
                    <p>{Tododata.todos}</p>
                  </div>
                  <button
                    className="img1"
                    onClick={() => HandleEdit(Tododata._id)}
                  >
                    <img src="image 7.png" alt="" />
                  </button>
                  <button
                    onClick={() => HandleDelete(Tododata._id)}
                    className="img2"
                  >
                    <img src="image 9.png" alt="" />
                  </button>
                </>
              )}
            </div>
          ))}

          {inputSectionStatus && (
            <div className="main-poster">
              <div className="poster">
                <span>Ooops....!</span>
                <br />
                <span>Input field is empty</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
