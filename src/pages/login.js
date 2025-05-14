import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLoginLink } from "../api/socialApi";
import { logout } from "../redux/loginSlice";

const SOCIAL_PROVIDERS = [
  { id: "kakao", name: "카카오톡", color: "#FEE500", textColor: "#3C1E1E" },
  { id: "google", name: "Google", color: "#4285F4", textColor: "#fff" },
  { id: "naver", name: "네이버", color: "#03C75A", textColor: "#fff" },
  { id: "github", name: "GitHub", color: "#000000", textColor: "#fff" },
  { id: "facebook", name: "Facebook", color: "#1877F2", textColor: "#fff" },
];

const LoginPage = () => {
  const loginState = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const handleLogin = (provider) => {
    const url = getLoginLink(provider);
    window.location.href = url;
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="App">
      {loginState.email ? (
        <button onClick={handleLogout}>로그아웃</button>
      ) : (
        SOCIAL_PROVIDERS.map((provider) => (
          <button
            key={provider.id}
            style={{
              backgroundColor: provider.color,
              color: provider.textColor,
              border: "none",
              borderRadius: "6px",
              padding: "12px 24px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "10px",
              display: "block",
              width: "220px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            onClick={() => handleLogin(provider.id)}
          >
            {provider.name}로 로그인
          </button>
        ))
      )}
    </div>
  );
};

export default LoginPage;
