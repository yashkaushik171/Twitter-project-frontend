import React from "react";

const Replies = () => {
  return (
    <>
      <div className="container home-body">
        <div className="row">
          <HomeLeftSection val="home" />

          <div className="col-7 home-right-section pt-3 ps-5 ">
            <div className="home-right-top-part d-flex justify-content-between align-items-center mb-4">
              <h2>Tweet Replies</h2>
            </div>

            <div className="main-content">
            <ReplyCard/>
              {/* {alltweets.map((val) => {
                return <TweetCard val={val} />;
              })} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Replies;
