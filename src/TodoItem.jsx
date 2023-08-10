import React, { useState, useCallback, useEffect } from "react";
import "./TodoItem.scss";

const TodoItem = ({
  todos,
  setTodos,
  todo,
  handleTodoItemClick,
  BASE_URL,
  getAuthHeaders,
}) => {
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
    async (id) => {
      const getTodoById = todos.find((todo) => todo.id === id);

      if (!getTodoById) return;

      const updatedTodo = {
        ...getTodoById,
        isCompleted: !getTodoById.isCompleted,
      };

      try {
        const response = await fetch(`${BASE_URL}/todos/${id}`, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify(updatedTodo),
        });

        if (!response.ok) {
          throw new Error("Failed to update todo");
        }

        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
        );
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    },
    [todos]
  );

  const handleRemove = useCallback(async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (response.status === 204) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      } else {
        console.error("삭제 오류:", response.status);
      }
    } catch (error) {
      console.error("API 요청 실패:", error);
    }
  });

  const updateBtnClick = useCallback((id) => {
    const getTodoById = todos.find((todo) => todo.id === id);
    if (getTodoById) {
      setIsUpdateClick(true);
      setUpdateId(id);
    }
  });

  const updateCancleClick = () => {
    setIsUpdateClick(false);
    setUpdateId(null);
  };

  const updateSubmitClick = useCallback(async (id) => {
    const getTodoById = todos.find((todo) => todo.id === id);

    const updatedTodoData = {
      todo: updateValue,
      isCompleted: getTodoById.isCompleted,
    };
    try {
      const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedTodoData),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const data = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, todo: updateValue } : todo
        )
      );

      setIsUpdateClick(false);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  });

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
