import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.scss";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [psd, setPsd] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePsd = (e) => {
    setPsd(e.target.value);
  };
  // 이메일 정규식
  const emailRegex = /\S+@\S+\.\S+/;

  // 이메일 유효성 검사
  const isEmailValid = emailRegex.test(email);
  // 비밀번호 유효성 검사
  const isPasswordValid = psd.length >= 8;

  const onSubmit = (e) => {
    e.preventDefault();

    if (!isEmailValid) {
      alert("올바른 이메일 주소를 입력해주세요.");
    } else if (!isPasswordValid) {
      alert("비밀번호는 8자리 이상 입력해주세요.");
    } else {
      fetch("/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: psd,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          navigate("/signin");
        });
    }
  };
  return (
    <div className="signup">
      <div className="signup-box">
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
  );
};

export default Signup;
