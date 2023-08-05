import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoList from "./TodoList";
import Header from "./Header";
import "./Todo.scss";

const Todo = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/signin");
    }
  }, []);

  return (
    <>
      <Header />
      <div className="todo">
        <p>Jutrong's Todo LIST</p>
        <div>
          <div className="todo-list">
            <div className="create-todo">
              <span>Create Todo</span>
            </div>
            <div className="todoitems">
              <div className="todoitem">
                <span>todo 1</span>
              </div>
              <div className="todoitem">
                <span>todo 2</span>
              </div>
              <div className="todoitem">
                <span>todo 3</span>
              </div>
            </div>
          </div>
          <div className="todo-content">
            <div className="content-box">
              <p>todo 1</p>
              <p>content</p>
            </div>
          </div>
        </div>
        {/* <TodoList /> */}
      </div>
    </>
  );
};

export default Todo;
