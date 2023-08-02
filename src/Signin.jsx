import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.scss";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      navigate("/todo");
    }
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePsd = (e) => {
    setPassword(e.target.value);
  };
  // 이메일 정규식
  const emailRegex = /\S+@\S+\.\S+/;

  // 이메일 유효성 검사
  const isEmailValid = emailRegex.test(email);
  // 비밀번호 유효성 검사
  const isPasswordValid = password.length >= 8;

  const onSubmit = (e) => {
    e.preventDefault();

    if (!isEmailValid) {
      alert("올바른 이메일 주소를 입력해주세요.");
    } else if (!isPasswordValid) {
      alert("비밀번호는 8자리 이상 입력해주세요.");
    } else {
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
              window.localStorage.setItem("access_token", data.access_token))
            : alert("비밀번호가 잘못되었습니다!")
        );
    }
  };
  return (
    <div className="signin">
      <div className="signin-box">
        <h2>로그인</h2>
        <input
          data-testid="email-input"
          placeholder="이메일을 입력해주세요."
          onChange={handleEmail}
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="비밀번호를 입력해주세요."
          onChange={handlePsd}
        />
        <button
          data-testid="signin-button"
          onClick={onSubmit}
          disabled={!isEmailValid || !isPasswordValid}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default Signin;
