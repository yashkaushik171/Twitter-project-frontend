import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tweeterVideo from "../assets/75041-twitter-button-3d-flat.mp4";
import axios from "axios";

const HomeLeftSection = (props) => {
  const userid = JSON.parse(localStorage?.getItem("user"))?._id;
  const [userinfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getUserInfo = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/singleuser/${userid}`
      );

      console.log(res?.data?.response, 34);
      setUserInfo(res?.data?.response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/login");
    }
    getUserInfo();
  }, []);

  return (
    <>
      <div className="col-3 home-left-section  ps-5">
        <i
          className="fa-brands fa-twitter fs-1 py-3 px-5 twitter-logo"
          style={{ color: "#1e64dc" }}
        ></i>
        {/* <div className="video-container">
          <video src={tweeterVideo} autoPlay loop muted></video>
        </div> */}
        <div className="mt-4  links ">
          <Link to="/" className=" text-decoration-none ">
            <section
              className={`nav-item d-flex align-items-center ps-4 mb-4 me-4 ${
                props?.val == "home" && "is-active"
              }`}
            >
              <i className="fa-solid fa-house fs-3 mb-2"></i>
              <p className="fs-3 ps-3">Home</p>
            </section>
          </Link>
          <Link to={`/profile/${userid}`} className=" text-decoration-none">
            <section
              className={`nav-item d-flex align-items-center ps-4 mb-4 me-4 ${
                props?.val == "profile" && "is-active"
              }`}
            >
              <i className="fa-solid fa-user fs-3 mb-2"></i>
              <p className="fs-3 ps-3">Profile</p>
            </section>
          </Link>
          <section className="nav-item d-flex align-items-center ps-4 mb-4 me-4">
            <i className="fa-solid fa-right-from-bracket fs-3 mb-2"></i>
            {/* <!-- Button trigger modal --> */}
            <p
              type="button"
              className="fs-3 ps-3"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal3"
            >
              Logout
            </p>

            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="exampleModal3"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title fs-2" id="exampleModalLabel">
                      Alert
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body my-5">
                    <div className="alert alert-danger fs-3" role="alert">
                      Do you really want to log out!
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger  fs-3 m-auto"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        logout();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="user-info d-flex align-items-center position-relative">
          {userinfo?.profileImage === "Image" ? (
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              alt="ronaldo"
              width={40}
              className="rounded-circle"
            />
          ) : (
            <img
              src={`${process.env.REACT_APP_BASE_URL}/${userinfo?.profileImage}`}
              alt="ronaldo"
              width={40}
              className="rounded-circle"
            />
          )}
          <div className="fs-3 ms-3">
            <h3 className="position-relative bottom-0 ">
              {userinfo?.fullname}
            </h3>
            <p className="fs-4">{userinfo?.username}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeLeftSection;
