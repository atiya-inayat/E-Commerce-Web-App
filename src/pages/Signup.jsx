import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created Successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="signup-main-cont">
        <div className="signup-cont">
          <h2 className="signup-heading">Create Account</h2>
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

            <div className="signup-btn-cont">
              <button className="signup-btn" type="submit">
                Sign Up
              </button>
            </div>
          </form>
          <div className="login-signup-confirmation-cont">
            <p className="login-signup-query-para">
              Already have an account?{" "}
              <Link className="login-signup-link" to="/login">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
