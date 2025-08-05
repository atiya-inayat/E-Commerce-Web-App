import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created Successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="signup-main-cont">
        <div className="signup-cont">
          <h2>Create Account</h2>
          <form onSubmit={handleSignup}>
            <div className="email-cont">
              <label> Email</label>
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
              <label> Password</label>
              <input
                className="signup-email"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
