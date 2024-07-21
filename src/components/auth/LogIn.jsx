import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { redirect, useNavigate } from "react-router-dom";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleLogin(e) {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const token = (await response.json()).jwtToken;

      if (response.ok) {
        login(token);
        console.log("THE JWT TOKEN: ", token);
        navigate("/home");
      }
    } catch (error) {
      console.log("Error when trying to log in:", error);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="field">
        <label htmlFor="" className="label">
          Email
        </label>
        <div className="control">
          <input type="email" className="input" onChange={handleEmailChange} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="" className="label">
          Password
        </label>
        <div className="control">
          <input
            type="password"
            className="input"
            onChange={handlePasswordChange}
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button className="button is-link">Log in</button>
        </div>
      </div>
    </form>
  );
}

export default LogIn;
