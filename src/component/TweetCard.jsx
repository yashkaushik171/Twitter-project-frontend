import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TweetCard = (props) => {
  const notifyTrue = (msg) => toast.success(msg);
  const notifyFalse = (msg) => toast.error(msg);
  const navigate = useNavigate();
  const {
    _id,
    content,
    images,
    tweetedBy,
    author,
    likes,
    retweetedBy,
    replies,
    tweetedAt,
    tweetProfileImage,
    repliedTo,
  } = props?.val;
  const key = props.key;
  const userid = JSON.parse(localStorage.getItem("user"))?._id;
  const username = JSON.parse(localStorage.getItem("user"))?.username;
  const [comment, setComment] = useState("");

  const likeTweet = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/liketweet`,
        {
          tweetid: _id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      if (res.status === 200) notifyTrue("User Liked");
    } catch (error) {
      console.log(error);
    }
  };
  const unlikeTweet = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/unliketweet`,
        {
          tweetid: _id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      if (res.status === 200) notifyTrue("User Unliked");
    } catch (error) {
      console.log(error);
    }
  };
  const reTweet = async () => {
    if (!retweetedBy?.includes(userid)) {
      try {
        const res = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/retweet`,
          {
            tweetid: _id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );
        if (res.status === 200) notifyTrue("retweeted");
      } catch (error) {
        console.log(error);
      }
    } else {
      notifyFalse("You can only retweet once.");
    }
  };

  const deleteTweet = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/deletetweet`,
        {
          tweetid: _id,
        }
      );
      if (res.status === 200) notifyTrue("tweet deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const commentAPI = async () => {
    if (!comment) return notifyFalse("field is empty");

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/replytweet`,
        {
          content: comment,
          tweetid: _id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      if (res.status === 200) notifyTrue("comment posted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="tweet-container p-2 border mb-1">
        {retweetedBy?.includes(userid) && (
          <p className="ms-5 fs-5 grey mb-0">retweeted by {username}</p>
        )}
        <div className="tweet-header d-flex justify-content-between  ">
          <div className="d-flex">
            {tweetProfileImage === "Image" ? (
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                alt="ronaldo"
                width={35}
                className="rounded-circle"
              />
            ) : (
              <img
                src={`${process.env.REACT_APP_BASE_URL}/${tweetProfileImage}`}
                alt="ronaldo"
                width={35}
                className="rounded-circle"
              />
            )}
            <Link
              className="text-decoration-none text-dark"
              to={`/profile/${tweetedBy}`}
            >
              <h3 className="ms-2 tweet-username">
                {userid === tweetedBy ? "(you)" : author?.username}
              </h3>
            </Link>
            <span className=" text-capitalize fs-4 ms-2">- {tweetedAt}</span>
          </div>
          {userid === tweetedBy ? (
            <i
              className="fa-solid fa-trash-can tweet-delete fs-3 pe-3 pt-2"
              onClick={() => {
                deleteTweet();
              }}
            ></i>
          ) : null}
        </div>

        <div
          className="tweet-body"
          onClick={() => {
            navigate(`/tweetreplies/${_id}`);
          }}
        >
          {repliedTo && (
            <p className="fs-5  mt-2 ms-5 text-capitalize grey">reply tweet</p>
          )}
          <p className="fs-4 tweet-text">{content}</p>
          {images === "images" ? null : (
            <div className="tweet-image">
              <img
                src={`${process.env.REACT_APP_BASE_URL}/${images}`}
                alt="bridge"
                width={100}
              />
            </div>
          )}
        </div>

        <div className="tweet-footer d-flex mb-2">
          <section className="d-flex align-items-center me-5">
            {likes?.includes(userid) ? (
              <i
                className="fa-solid fa-heart fs-3"
                style={{ color: "#eb4d4b" }}
                onClick={() => {
                  unlikeTweet();
                }}
              ></i>
            ) : (
              <i
                className="fa-regular fa-heart fs-3"
                style={{ color: "#eb4d4b" }}
                onClick={() => {
                  likeTweet();
                }}
              ></i>
            )}
            <span className="ms-3 fs-3">{likes?.length}</span>
          </section>
          <section className="d-flex align-items-center me-5">
            {/* <!-- comment trigger modal --> */}
            <button
              type="button"
              className=" border-0 bg-transparent"
              data-bs-toggle="modal"
              data-bs-target={`#exampleModal${_id}`}
            >
              <i
                className="fa-regular fa-comment fs-3 "
                style={{ color: "#7ed6df" }}
              ></i>
            </button>

            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id={`exampleModal${_id}`}
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title fs-3" id="exampleModalLabel">
                      Comment
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body my-4">
                    <textarea
                      className="textarea-tweet fs-4 p-2 "
                      placeholder="Comment here.."
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      required
                    ></textarea>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button "
                      className="btn btn-primary fs-3"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        commentAPI();
                      }}
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <span className="ms-3 fs-3">{replies?.length}</span>
          </section>
          <section className="d-flex align-items-center">
            <i
              className="fa-solid fa-retweet fs-3"
              style={{ color: "#badc58" }}
              onClick={() => {
                reTweet();
              }}
            ></i>
            <span className="ms-3 fs-3">{retweetedBy?.length}</span>
          </section>
        </div>
      </div>
    </>
  );
};

export default TweetCard;
