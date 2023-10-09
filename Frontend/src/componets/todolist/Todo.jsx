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
    const respone = await axios("https://todo-app-server-sooty.vercel.app/api/todo");
    setTodosArray(respone.data);
    console.log(todosArray, "setted");
  };

  //ADD NEW TODO//

  const AddTodo = async () => {
    if (userInputData === "") {
      setInputSectionStatus(true);
      setTimeout(() => {
        setInputSectionStatus(false);
      }, 800);
    } else {
      const respone = await axios("https://todo-app-server-sooty.vercel.app/api/todo", {
        method: "POST",
        data: {
          userInputData: userInputData,
        },
      });

      if (respone.data) {
        setTodosArray(respone.data);
        Fetchtodosfromserver();
        setUserInputData("");
      }
    }
  };

  /-------------------------------------------------------------------------------/;
  //TODO DELETE FUNCTION//

  const HandleDelete = async (TodoId) => {
    const response = await axios("https://todo-app-server-sooty.vercel.app/api/todo", {
      method: "DELETE",
      data: {
        todosArray: todosArray,
        TodoId: TodoId,
      },
    });
    console.log(todosArray, "====frontend array");
    setTodosArray(response.data);
  };
  /---------------------------------------------------------------------------------------/;
  //TODO COMPLETE

  const HandleComplete = async (TodoId) => {
    const respone = await axios("https://todo-app-server-sooty.vercel.app/api/todos/complete", {
      method: "PUT",
      data: {
        TodoId: TodoId,
      },
    });
    console.log(respone.data, "data ");
    setTodosArray(respone.data);
  };

  /-------------------------------------------------------------------------------------/;
  //TODO EDIT SECTION//

  const HandleEdit = async (TodoId) => {
    if (editButtonStatus === TodoId) {
      setEditButtonStatus(null);
    } else {
      setEditButtonStatus(TodoId);
      const userclikedtodo = todosArray.find(
        (Tododata) => Tododata.id === TodoId
      );
      setEditedInputValues({
        [TodoId]: userclikedtodo.TodoList,
      });
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
    const respone = await axios("https://todo-app-server-sooty.vercel.app/api/todo", {
      method: "PUT",
      data: {
        TodoId: TodoId,
        editedInputValues: editedInputValues,
      },
    });
    console.log(respone.data, "==response data");
    setTodosArray(respone.data);
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
            <div className="list-container" key={Tododata.id}>
              {/*----------------------------------------------------------------*/}

              {editButtonStatus != null && editButtonStatus === Tododata.id ? (
                <div className="error-maindiv">
                  <div className="input-div2">
                    <input
                      type="text"
                      value={editedInputValues[Tododata.id] || ""}
                      onChange={(event) =>
                        HandleInputChange(Tododata.id, event.target.value)
                      }
                    />
                  </div>
                  <div className="save-btn">
                    <button onClick={() => HandleSave(Tododata.id)}>
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
                    onClick={() => HandleComplete(Tododata.id)}
                    id={Tododata.status ? "listcomplete" : ""}
                    className="text"
                  >
                    <p>{Tododata.TodoList}</p>
                  </div>
                  <button
                    className="img1"
                    onClick={() => HandleEdit(Tododata.id)}
                  >
                    <img src="image 7.png" alt="" />
                  </button>
                  <button
                    onClick={() => HandleDelete(Tododata.id)}
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
