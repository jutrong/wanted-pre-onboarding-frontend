import React, { useState, useCallback, useEffect } from "react";
import "./TodoItem.scss";

const TodoItem = ({ todos, setTodos, todo, handleTodoItemClick }) => {
  const [isUpdateClick, setIsUpdateClick] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [updateValue, setUpdateValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(todo.isCompleted);
  }, [todo]);

  const handleItemClick = () => {
    handleTodoItemClick(todo.todo);
  };

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

  const updateBtnClick = (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      setIsUpdateClick(true);
      setUpdateId(id);
    }
  };

  const updateCancleClick = () => {
    setIsUpdateClick(false);
    setUpdateId(null);
  };

  const updateSubmitClick = (id) => {
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
    <>
      <ul>
        <li>
          {isUpdateClick && updateId === todo.id ? (
            <div>
              <input
                data-testid="modify-input"
                onChange={(e) => {
                  setUpdateValue(e.target.value);
                }}
              ></input>
              <button
                data-testid="submit-button"
                onClick={() => updateSubmitClick(todo.id)}
              >
                제출
              </button>
              <button data-testid="cancel-button" onClick={updateCancleClick}>
                취소
              </button>
            </div>
          ) : (
            <label onClick={handleItemClick}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {
                  checkboxClick(todo.id);
                  setIsChecked(!isChecked);
                }}
              />
              <span className={todo.isCompleted ? "completed" : ""}>
                {todo.todo}
              </span>
              <button
                onClick={() => {
                  updateBtnClick(todo.id);
                }}
                className="update-btn"
              >
                수정
              </button>
              <button
                data-testid="delete-button"
                onClick={() => handleRemove(todo.id)}
                className="delete-btn"
              >
                삭제
              </button>
            </label>
          )}
        </li>
      </ul>
    </>
  );
};

export default TodoItem;
