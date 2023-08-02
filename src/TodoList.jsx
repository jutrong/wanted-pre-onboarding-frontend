import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setTodos([...todos, { todo: value, isCompleted: false, userId: 1 }]);
    setValue("");
    console.log(value);
    fetch("https://www.pre-onboarding-selection-task.shop/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        todo: value,
      }),
    }).then((data) => console.log(data));
  };
  
  return (
    <div className="todo">
      <input data-testid="new-todo-input" value={value} onChange={onChange} />
      <button data-testid="new-todo-add-button" onClick={onSubmit}>
        추가
      </button>
      <ul>
        {todos.map((item) => (
          <li>
            <label>
              <input type="checkbox" />
              <span>{item.todo}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
