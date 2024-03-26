import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const requestBody = JSON.stringify({ username, email, password }); 
    console.log("Request Body:", requestBody); 

    fetch("https://todoapi-atu2.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    })
      .then((response) => {
        console.log("Response Status:", response.status);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Signup response:", data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        alert("An error occurred while signing up. Please try again later.");
      });
  };

  return (
    <div className="main">
      <h2>Signup</h2>
      <form onSubmit={handleSignup} className="signup">
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login">
          Signup
        </button>
        <div className="signupFooter">
        <h3>Already have an account?</h3>
        <a href="login">Login</a>
      </div>
      </form>
      
    </div>
  );
};

export default Signup;
