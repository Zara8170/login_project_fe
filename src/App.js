import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SocialRedirectPage from "./components/auth/SocialRedirectPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/member/:provider" element={<SocialRedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
