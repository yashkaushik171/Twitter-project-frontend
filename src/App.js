import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import Profile from "./component/Profile";
import Signup from "./component/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TweetReplies from "./component/TweetReplies";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/profile/:id" element={<Profile val="none" />} />
        <Route exact path="/tweetreplies/:id" element={<TweetReplies />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
        className="fs-4"
      />
    </>
  );
};

export default App;
