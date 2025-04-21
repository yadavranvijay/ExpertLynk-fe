// src/components/Register.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Registration submitted:", { name, email, password });
  };

  return (
    <div className="container py-5">
      <div className="row align-items-center auth-container">
        <div className="col-lg-7 col-md-6 col-sm-12 position-relative">
          <div className="img">
            <img src="./images/login.jpg" alt="" />
          </div>
          <div className="text-side">
            <h1 className="h4"> Expert Lynk</h1>
            <p>Your surveys partner.</p>
            <buton className="btn know-more">Read More</buton>
          </div>
        </div>
        <div className="col-lg-5 col-md-6 col-sm-12">
          <div className="auth-card">
            <div className="auth-body">
              <h2 className="auth-welcome">Hello!</h2>
              <p className="auth-message">Sign Up to Get Started</p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password"
                    required
                  />
                </div>
                {/* <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    I Agree
                  </label>
                </div> */}

                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Login
                </button>

                <div className="text-center">
                  <p className="mt-3">
                    Already have an account?{" "}
                    <Link to="/login" className="auth-link">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
