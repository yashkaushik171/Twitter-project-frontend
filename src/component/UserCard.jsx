import React, { useEffect, useState } from "react";
import axios from "axios";

const UserCard = ({ val }) => {
  const [userinfo, setUserInfo] = useState({});
  const getSingleUser = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/singleuser/${val}`);
    setUserInfo(res.data.response);
  };

  const { _id, fullname, username, profileImage, joined } = userinfo;

  useEffect(() => {
    getSingleUser();
  }, []);
  return (
    <>
      <div className="tweet-header d-flex justify-content-between  mb-2 p-3 ">
        <div className="d-flex">
          {profileImage === "Image" ? (
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              alt="ronaldo"
              width={40}
              className="rounded-circle"
            />
          ) : (
            <img
              src={`${process.env.REACT_APP_BASE_URL}/${profileImage}`}
              alt="ronaldo"
              width={60}
              className="rounded-circle"
            />
          )}
          <div className=" d-flex flex-column justify-content-center">
            <h3 className="ms-2 tweet-username">{fullname}</h3>
            <span className="ms-2 tweet-username fw-normal fs-4">
              {username}
            </span>
          </div>

          <span className=" text-capitalize fs-4 fw-normal ms-2 mt-3">
            - {joined}
          </span>
        </div>
      </div>
    </>
  );
};

export default UserCard;
