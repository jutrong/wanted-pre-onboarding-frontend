import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TodoItem from "./TodoItem";
import "./Todo.scss";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    fetch("https://www.pre-onboarding-selection-task.shop/todos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, [todos]);

  const onChange = useCallback((e) => setValue(e.target.value), []);

  const onSubmit = (e) => {
    e.preventDefault();
    setValue("");
    fetch("https://www.pre-onboarding-selection-task.shop/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        todo: value,
      }),
    })
      .then((res) => res.json())
      .then((data) => setTodos((prevTodos) => [...prevTodos, data]));
  };

  const handleTodoItemClick = (todo) => {
    setSelectedTodo(todo);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };
  return (
    <>
      <div className="header">
        <p>Home</p>
        <p className="logout" onClick={logout}>
          Logout
        </p>
      </div>
      <div className="todo">
        <p>Jutrong's Todo LIST</p>
        <div>
          <div className="todo-list">
            <div className="create-todo">
              <input
                className="plus-todo"
                data-testid="new-todo-input"
                value={value}
                onChange={onChange}
              />
              <button data-testid="new-todo-add-button" onClick={onSubmit}>
                추가
              </button>
            </div>
            <div className="todoitems">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                  handleTodoItemClick={handleTodoItemClick}
                />
              ))}
            </div>
          </div>
          <div className="todo-content">
            <div className="content-box">
              {selectedTodo && (
                <>
                  <p>{selectedTodo}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
