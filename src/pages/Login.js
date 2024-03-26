import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("https://todoapi-atu2.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem('loggedIn',true);
          navigate("/todo");
        } else {
          alert("Token not found in response. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert("An error occurred. Please try again later.");
      });
  };

  return (
    <div className="login-container">
      <div className="loginWords">
        {" "}
        <h1>
          <span className="colored"></span>
          "Welcome to our intuitive todo management platform, where organizing
          your tasks becomes effortless and efficient."
          <span className="colorone">
            "Stay on top of your daily agenda with our user-friendly todo list
            application designed to streamline your productivity."
          </span>{" "}
          "Experience seamless task management with our innovative features that
          prioritize simplicity and functionality."
          <span className="colortwo">
            {" "}
            "Create, edit, and manage todos effortlessly, ensuring nothing falls
            through the cracks as you conquer your goals."
          </span>
        </h1>
        fa
      </div>

      <form onSubmit={handleLogin} className="loginForm">
        <h2>Login</h2>
        <div className="loginItems">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="loginItems">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login" >
          Login
        </button>
        <div className="loginFooter">
          <h3>Don't have an account already?</h3>
          <a href="signup">Signup</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
