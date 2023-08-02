import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoList from "./TodoList";

const Todo = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  return (
    <div className="title">
      오늘의 할 일 ()
      <TodoList />
    </div>
  );
};

export default Todo;
