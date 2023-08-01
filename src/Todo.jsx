import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);
  return (
    <div className="todo">
      <input data-testid="new-todo-input" />
      <button data-testid="new-todo-add-button">추가</button>
      <Todolist />
    </div>
  );
};

export default Todo;

export const Todolist = () => {
  return (
    <div>
      <li>
        <label>
          <input type="checkbox" />
          <span>TODO 1</span>
        </label>
      </li>
    </div>
  );
};
