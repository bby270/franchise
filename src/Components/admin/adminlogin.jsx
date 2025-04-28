import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./adminlogin.css";

export default function AdminLogin() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!id || !pw) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
    } else if (id === "admin" && pw === "1234") {
      sessionStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };
  

  return (
    <div className="login-page">
      <h2>관리자 로그인</h2>
      <input
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        placeholder="PW"
        type="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}
