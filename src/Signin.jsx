import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.scss";
import Header from "./Header";

const Signin = () => {
  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      navigate("/todo");
    }
  }, []);

  useEffect(() => {
    setIsValid(email.includes("@") && password.length > 7);
  }, [email, password]);

  const onSubmit = (e) => {
    e.preventDefault();

    fetch("https://www.pre-onboarding-selection-task.shop/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        data.access_token
          ? (navigate("/todo"),
            localStorage.setItem("access_token", data.access_token))
          : console.log(data.message)
      );
  };
  return (
    <>
      <Header />
      <div className="signin">
        <div className="signin-box">
          <h2>로그인</h2>
          <input
            data-testid="email-input"
            placeholder="이메일을 입력해주세요."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            data-testid="password-input"
            placeholder="비밀번호를 입력해주세요."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            data-testid="signin-button"
            onClick={onSubmit}
            style={{ backgroundColor: isValid ? "green" : "red" }}
          >
            로그인
          </button>
        </div>
      </div>
    </>
  );
};

export default Signin;
