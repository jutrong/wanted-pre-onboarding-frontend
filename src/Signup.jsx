import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.scss";
import Header from "./Header";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

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
      fetch("https://www.pre-onboarding-selection-task.shop/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then((data) => {
        console.log(data);
        navigate("/signin");
      });
    }
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
            onChange={handleEmail}
          />
          <input
            type="password"
            data-testid="password-input"
            placeholder="비밀번호를 입력해주세요."
            onChange={handlePsd}
          />
          <button
            data-testid="signup-button"
            onClick={onSubmit}
            disabled={!isEmailValid || !isPasswordValid}
          >
            회원가입
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
