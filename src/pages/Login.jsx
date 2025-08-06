import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate("/"); // or go to dashboard
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <>
      <div className="login-main-cont">
        <div className="signup-cont">
          <div className="login-h-cont">
            <h2 className="login-heading">Login</h2>
          </div>
          <form onSubmit={handleLogin}>
            <div className="email-cont">
              <label>Email</label>
              <input
                className="signup-email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="pass-cont">
              <label>Password</label>
              <input
                className="signup-email"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="login-btn-cont">
              <button className="login-submit-btn" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
