const BASE_URL = "https://www.pre-onboarding-selection-task.shop/";

export function postCreateTodo() {
  return fetch(`${BASE_URL}/todos`, {
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
}
