import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";

const FollowersModal = () => {
  const [userinfo, setUserInfo] = useState({});
  const userid = JSON.parse(localStorage?.getItem("user"))?._id;

  const getUserInfo = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/singleuser/${userid}`
      );

      setUserInfo(res?.data?.response);
    } catch (error) {
      console.log(error, 101);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <>
      <button
        type="button"
        className=" bg-transparent border-0 "
        data-bs-toggle="modal"
        data-bs-target="#followersmodal"
      >
        Followers
      </button>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="followersmodal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-3" id="exampleModalLabel">
                Followers
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-3">
              {userinfo?.followers?.length === 0 ? (
                <h2 className=" text-center">Zero following</h2>
              ) : (
                userinfo?.followers?.map((val) => {
                  return <UserCard val={val} />;
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowersModal;
