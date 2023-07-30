import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <Link to="/signup">회원가입</Link>
      <Link to="/signin">로그인</Link>
    </div>
  );
};

export default Home;
