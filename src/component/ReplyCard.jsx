import React from "react";

const ReplyCard = () => {
  return (
    <>
      <div className="tweet-container p-2 border mb-1">
        <div className="tweet-header d-flex justify-content-between  ">
          <div className="d-flex">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              alt="user-image"
              className=" rounded-circle"
              width={35}
            />
            <Link
              className="text-decoration-none text-dark"
              to={`/profile/${tweetedBy}`}
            >
              <h3 className="ms-2 tweet-username">{author.username}</h3>
            </Link>
            <span className=" text-capitalize fs-4 ms-2">
              - sat jan 28 2023
            </span>
          </div>
          {userid === tweetedBy ? (
            <i
              class="fa-solid fa-trash-can tweet-delete fs-3 pe-3 pt-2"
              onClick={() => {
                deleteTweet();
              }}
            ></i>
          ) : null}
        </div>
        <div className="tweet-body">
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
            {likes.includes(userid) ? (
              <i
                class="fa-solid fa-heart fs-3"
                style={{ color: "#eb4d4b" }}
                onClick={() => {
                  unlikeTweet();
                }}
              ></i>
            ) : (
              <i
                class="fa-regular fa-heart fs-3"
                style={{ color: "#eb4d4b" }}
                onClick={() => {
                  likeTweet();
                }}
              ></i>
            )}
            <span className="ms-3 fs-3">{likes?.length}</span>
          </section>
          <section className="d-flex align-items-center me-5">
            {/* <!-- Button trigger modal --> */}
            <button
              type="button"
              class=" border-0 bg-transparent"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal2"
            >
              <i
                className="fa-regular fa-comment fs-3 "
                style={{ color: "#7ed6df" }}
              ></i>
            </button>

            {/* <!-- Modal --> */}
            <div
              class="modal fade"
              id="exampleModal2"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title fs-3" id="exampleModalLabel">
                      Comment
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body my-4">
                    <textarea
                      className="textarea-tweet fs-4 p-2 "
                      placeholder="Comment here.."
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button "
                      class="btn btn-primary fs-3"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        commentApi();
                      }}
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <span className="ms-3 fs-3">{replies.length}</span>
          </section>
          <section className="d-flex align-items-center">
            <i
              className="fa-solid fa-retweet fs-3"
              style={{ color: "#badc58" }}
            ></i>
            <span className="ms-3 fs-3">0</span>
          </section>
        </div>
      </div>
    </>
  );
};

export default ReplyCard;
