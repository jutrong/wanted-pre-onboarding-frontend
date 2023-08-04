import React, { useState, useCallback, useEffect } from "react";
import "./TodoList.scss";

// 렌더링 최적화 필요
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [isUpdateClick, setIsUpdateClick] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [updateValue, setUpdateValue] = useState("");

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

  const onSubmit = useCallback((e) => {
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
  });

  const checkboxClick = useCallback(
    (id) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
      );

      const todoToUpdate = todos.find((todo) => todo.id === id);
      if (todoToUpdate) {
        fetch(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            todo: todoToUpdate.todo,
            isCompleted: !todoToUpdate.isCompleted,
          }),
        }).then((res) => res.json());
      }
    },
    [todos]
  );

  const handleRemove = (id) => {
    fetch(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then((res) => {
      if (res.status === 204) {
        setTodos((todos) => todos.filter((todo) => todo.id !== id));
      } else {
        console.error("삭제 오류:", res.status);
      }
    });
  };

  const handleUpdate = (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      setIsUpdateClick(true);
      setUpdateId(id);
    }
  };

  const handleCancelUpdate = () => {
    setIsUpdateClick(false);
    setUpdateId(null);
  };

  // const handleSubmitUpdate = (id) => {
  //   update(id);
  // };
  const update = (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);

    fetch(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        todo: updateValue,
        isCompleted: todoToUpdate.isCompleted,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, todo: updateValue } : todo
          )
        );
      });
    setIsUpdateClick(false);
  };

  return (
    <div className="todo">
      <input data-testid="new-todo-input" value={value} onChange={onChange} />
      <button data-testid="new-todo-add-button" onClick={onSubmit}>
        추가
      </button>
      <ul>
        {todos.map((data) => (
          <li key={data.id}>
            {isUpdateClick && updateId === data.id ? (
              <div>
                <input
                  data-testid="modify-input"
                  onChange={(e) => {
                    setUpdateValue(e.target.value);
                  }}
                ></input>
                <button
                  data-testid="submit-button"
                  onClick={() => update(data.id)}
                >
                  제출
                </button>
                <button
                  data-testid="cancel-button"
                  onClick={handleCancelUpdate}
                >
                  취소
                </button>
              </div>
            ) : (
              <label>
                <input
                  type="checkbox"
                  checked={data.isCompleted}
                  onChange={() => checkboxClick(data.id)}
                />
                <span className={data.isCompleted ? "completed" : ""}>
                  {data.todo}
                </span>
                <button
                  onClick={() => {
                    handleUpdate(data.id);
                  }}
                >
                  수정
                </button>
                <button
                  data-testid="delete-button"
                  onClick={() => handleRemove(data.id)}
                >
                  삭제
                </button>
              </label>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
