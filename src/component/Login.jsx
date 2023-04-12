import React, { useState } from "react";
import loginImage from "../Images/login-image.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const notifyTrue = (msg) => toast.success(msg);
  const notifyFalse = (msg) => toast.error(msg);

  const userLogin = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
        email,
        password,
      });
      console.log(res);
      if (res.status === 201) notifyTrue(res.data.msg);
      setShowLoader(false);
      localStorage.setItem("jwt", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.payload));
      navigate("/");
    } catch (error) {
      if (error.response.status == 401) notifyFalse(error.response.data.err);
      if (error.response.status == 402) notifyFalse(error.response.data.err);
      if (error.response.status == 403) notifyFalse(error.response.data.err);
      setShowLoader(false);
    }
  };

  return (
    <>
      <div className="container-fluid login-body d-flex align-items-center justify-content-center ">
        <div className="login-box  d-flex  ">
          <div className="login-img ">
            <img src={loginImage} alt="login-image" />
          </div>
          <div className="login-content fs-3 ">
            <h1 className="text-capitalize mb-5">log in </h1>
            <form className="mb-5">
              <input
                type="email"
                placeholder="Email"
                className="mb-3"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                className="mb-3"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
              <br />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowLoader(true);
                  userLogin();
                }}
              >
                {showLoader && (
                  <div className="spinner-border me-2 " role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
                Login
              </button>
              <br />
            </form>
            <p className=" text-capitalize ">
              dont have an account,
              <span className="px-2">
                <Link to="/signup">signup</Link>
              </span>
              here
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
