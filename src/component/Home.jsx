import React, { useEffect } from "react";
import { useState } from "react";
import HomeLeftSection from "./HomeLeftSection";
import TweetCard from "./TweetCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [textarea, setTextarea] = useState("");
  const [images, setImage] = useState("");
  const [alltweets, setAllTweets] = useState([]);
  const navigate = useNavigate();
  const formData = new FormData();

  const notifyTrue = (msg) => toast.success(msg);
  // const notifyFalse = (msg) => toast.error(msg);

  formData.append("content", textarea);
  formData.append("images", images);

  const createTweetApi = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/createtweet`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      console.log(res, 21);
      if (res.status === 200) notifyTrue("tweet posted");
    } catch (error) {
      console.log(error);
    }
  };

  const getTweets = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/alltweets`,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      setAllTweets(res?.data?.response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/login");
    }
    getTweets();
  }, [alltweets]);

  return (
    <>
      <div className="container home-body">
        <div className="row">
          <HomeLeftSection val="home" />

          <div className="col-7 home-right-section pt-3 ps-5 ">
            <div className="home-right-top-part d-flex justify-content-between align-items-center mb-4">
              <h2>Home</h2>
              <button
                type="button"
                className="btn btn-primary fs-3"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Tweet
              </button>

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
                      <h5 className="modal-title fs-3" id="exampleModalLabel">
                        New Tweet
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <textarea
                        name="tweet"
                        className="textarea-tweet fs-3 ps-2 pt-2 mb-4"
                        placeholder="Tweet here ..."
                        onChange={(e) => {
                          setTextarea(e.target.value);
                        }}
                        value={textarea}
                      ></textarea>

                      <input
                        type="file"
                        className="fs-4 mb-4"
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
                          createTweetApi();
                        }}
                      >
                        Tweet
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-content">
              {alltweets?.map((val, index) => {
                return <TweetCard val={val} id={index} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
