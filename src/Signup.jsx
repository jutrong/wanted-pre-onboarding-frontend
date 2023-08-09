import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.scss";
import Header from "./Header";

const Signup = () => {
  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/todo");
    }
  }, []);

  useEffect(() => {
    setIsValid(email.includes("@") && password.length > 7);
  }, [email, password]);

  const onSubmit = (e) => {
    e.preventDefault();
    
    fetch("https://www.pre-onboarding-selection-task.shop/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((data) => {
      if (data.status === 201) {
        navigate("/signin");
      }
    });
  };
  return (
    <>
      <Header />
      <div className="signup">
        <div className="signup-box">
          <h2>회원가입</h2>
          <input
            data-testid="email-input"
            placeholder="이메일을 입력해주세요."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            data-testid="password-input"
            placeholder="비밀번호를 입력해주세요"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            data-testid="signup-button"
            onClick={onSubmit}
            style={{ backgroundColor: isValid ? "green" : "red" }}
          >
            회원가입
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
