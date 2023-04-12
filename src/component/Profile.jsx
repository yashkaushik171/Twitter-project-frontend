import React, { useEffect, useState } from "react";
import HomeLeftSection from "./HomeLeftSection";
import TweetCard from "./TweetCard";
import ronaldoImg from "../Images/Cristiano_Ronaldo_2018__cropped_.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FollowModal from "./FollowModal";
import FollowersModal from "./FollowersModal";

const Profile = () => {
  const [allusertweets, setAllUserTweets] = useState([]);
  const [userinfo, setUserInfo] = useState({});
  const [location, setLocation] = useState("");
  const [dob, setDob] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState();
  const navigate = useNavigate();
  const notifyTrue = (msg) => toast.success(msg);
  const notifyFalse = (msg) => toast.error(msg);

  const formData = new FormData();
  formData.append("images", image);

  const userid = JSON.parse(localStorage?.getItem("user"))?._id;
  const { id } = useParams();

  const getUserTweets = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/singleusertweet/${id}`,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      setAllUserTweets(res?.data?.response);
    } catch (error) {
      console.log(error, 41);
    }
  };

  const followUser = async () => {
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/followuser`,
      {
        userid: id,
      },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
    if (res.status == 200) notifyTrue("Followed");
    navigate(`/profile/${id}`);
  };

  const unfollowUser = async () => {
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/unfollowuser`,
      {
        userid: id,
      },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
    if (res.status == 200) notifyTrue("Unfollowed");
    navigate(`/profile/${id}`);
  };

  const edit = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/edituser/${id}`,
        { location, name, dob },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      if (res.status === 200) notifyTrue("Edited");
    } catch (error) {
      if (error.response.status == 400) notifyFalse("pls fill the feilds");
    }
  };

  const update = async () => {
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/updateuser/${id}`,
      formData
    );
    if (res.status === 200) notifyTrue("profile Image Uploaded");
  };

  const getUserInfo = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/singleuser/${id}`
      );

      setUserInfo(res?.data?.response);
    } catch (error) {
      console.log(error, 101);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/login");
    }
    getUserTweets();
    getUserInfo();
  }, [userinfo]);

  return (
    <>
      <div className="container home-body">
        <div className="row">
          <HomeLeftSection val="profile" />

          <div className="col-7 home-right-section pt-3 ps-5 ">
            <div className="home-right-top-part d-flex justify-content-between align-items-center mb-4">
              <h2>Profile</h2>
            </div>
            <div className="main-content">
              <div className="profile-section mb-3 ">
                <section></section>
                <div className=" profile-image d-flex justify-content-between align-items-center px-4">
                  {userinfo.profileImage === "Image" ? (
                    <img
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                      alt="ronaldo"
                      width={150}
                      className="rounded-circle main-profile-image"
                    />
                  ) : (
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/${userinfo.profileImage}`}
                      alt="ronaldo"
                      width={150}
                      className="rounded-circle main-profile-image"
                    />
                  )}

                  {userid === id ? (
                    <>
                      {/* update profile pic modal button */}

                      <button
                        type="button"
                        className="btn upload-profile-pic-btn fs-3 px-5 py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal1"
                      >
                        Upload Profile Pic
                      </button>

                      {/* update profile pic modal card */}

                      <div
                        className="modal fade"
                        id="exampleModal1"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog ">
                          <div className="modal-content ">
                            <div className="modal-header">
                              <h5
                                className="modal-title fs-3"
                                id="exampleModalLabel"
                              >
                                Profile Picture
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body d-block py-4">
                              <input
                                type="file"
                                className="mb-3"
                                onChange={(e) => {
                                  setImage(e.target.files[0]);
                                }}
                              />
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary fs-3"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary fs-3"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                  update();
                                }}
                              >
                                Apply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* edit modal button */}

                      <button
                        type="button"
                        className="btn btn-primary fs-3 px-5 py-2 edit-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Edit
                      </button>

                      {/* edit modal card */}

                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog ">
                          <div className="modal-content ">
                            <div className="modal-header">
                              <h5
                                className="modal-title fs-3"
                                id="exampleModalLabel"
                              >
                                Edit Profile
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body d-block py-4">
                              <label className="fs-4">Name</label>
                              <input
                                type="text"
                                className="mb-3"
                                onChange={(e) => {
                                  setName(e.target.value);
                                }}
                                value={name}
                              />
                              <label className="fs-4">Location</label>
                              <input
                                type="text"
                                className="mb-3"
                                onChange={(e) => {
                                  setLocation(e.target.value);
                                }}
                                value={location}
                              />
                              <label className="fs-4">Date of birth</label>
                              <input
                                type="date"
                                className="mb-3"
                                onChange={(e) => {
                                  setDob(e.target.value);
                                }}
                                value={dob}
                              />
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary fs-3"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary fs-3"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                  edit();
                                }}
                              >
                                Apply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : !userinfo?.followers?.includes(userid) ? (
                    <button
                      className="btn btn-secondary fs-3 px-5 py-2 follow-btn"
                      onClick={() => {
                        followUser();
                      }}
                    >
                      Follow
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary fs-3 px-5 py-2 follow-btn"
                      onClick={() => {
                        unfollowUser();
                      }}
                    >
                      Unfollow
                    </button>
                  )}
                </div>
                <div className="profile-info px-4">
                  <h3 className="">{userinfo.fullname}</h3>
                  <span className="fs-4 grey">{userinfo.username}</span>

                  <div className="user-personal-info d-flex mt-4">
                    <div className="d-flex align-items-center me-5">
                      <i className="fa-solid fa-cake-candles fs-3"></i>
                      <p className="fs-4 m-0 ms-2 text-capitalize">
                        dob, {userinfo?.dob}
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="fa-solid fa-location-dot fs-3"></i>
                      <p className="fs-4 m-0 ms-2 text-capitalize ">
                        location, {userinfo?.location}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center mt-3">
                    <i className="fa-regular fa-calendar fs-3"></i>
                    <p className="fs-4 m-0 ms-2 text-capitalize">
                      joined, {userinfo.joined}
                    </p>
                  </div>

                  <div className="following-info d-flex mt-4">
                    <h3 className="me-4">
                      {userinfo?.following?.length} <FollowModal />
                      {/* <!-- Button trigger modal --> */}
                    </h3>
                    <h3>
                      {userinfo?.followers?.length} <FollowersModal />
                    </h3>
                  </div>
                </div>
              </div>
              <h3 className=" text-capitalize my-5 text-center">
                tweets and reply
              </h3>
              <div>
                {allusertweets.map((val) => {
                  return <TweetCard val={val} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
