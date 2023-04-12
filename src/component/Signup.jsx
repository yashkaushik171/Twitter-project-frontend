import React, { useState } from "react";
import signupImage from "../Images/signup-image.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const date = new Date();
  const navigate = useNavigate();

  const notifyTrue = (msg) => toast.success(msg);
  const notifyFalse = (msg) => toast.error(msg);

  const userSignup = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, {
        fullname,
        username,
        email,
        password,
        joined: date.toDateString(),
      });
      console.log(res);
      if (res.status == 201) notifyTrue(res.data.msg);
      navigate("/login");
    } catch (error) {
      if (error.response.status == 401) notifyFalse(error.response.data.err);
      if (error.response.status == 402) notifyFalse(error.response.data.err);
      if (error.response.status == 403) notifyFalse(error.response.data.err);
    }
  };

  return (
    <>
      <div className="container-fluid login-body d-flex align-items-center justify-content-center ">
        <div className="login-box  d-flex  ">
          <div className="login-img ">
            <img src={signupImage} alt="login-image" />
          </div>
          <div className="login-content fs-3 ">
            <h1 className="text-capitalize mb-5">sign up </h1>
            <form className="mb-5">
              <input
                type="text"
                placeholder="Fullname"
                className="mb-3"
                onChange={(e) => {
                  setFullname(e.target.value);
                }}
                value={fullname}
              />
              <br />
              <input
                type="text"
                placeholder="Username  | eg- @abc"
                className="mb-3"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
              />
              <br />
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
                  userSignup();
                }}
              >
                Signup
              </button>
              <br />
            </form>
            <p className=" text-capitalize ">
              already have an account,
              <span className="px-2">
                <Link to="/login">login</Link>
              </span>
              here
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
