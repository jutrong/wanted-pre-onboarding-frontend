import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Signup from "./Signup";
import Signin from "./Signin";

import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <Link to="/signup">
        <span className="signup-link">회원가입</span>
      </Link>
      <Link to="/signin">
        <span className="signin-link">로그인</span>
      </Link>
    </div>
  );
};

export default Home;
