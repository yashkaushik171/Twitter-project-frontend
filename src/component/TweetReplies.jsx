import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import TweetCard from "./TweetCard";
import axios from "axios";
import HomeLeftSection from "./HomeLeftSection";

const TweetReplies = () => {
  const { id } = useParams();
  const [singleTweet, setSingleTweet] = useState({});
  const [tweetReplies, setTweetReplies] = useState([]);

  const getSingleTweet = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/singletweet/${id}`
      );
      setSingleTweet(res?.data?.response);
      res?.data?.response?.replies?.map(async (id) => {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/singletweet/${id}`
        );
        setTweetReplies((oldData) => [...oldData, res?.data?.response]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(tweetReplies, 35);

  useEffect(() => {
    getSingleTweet();
  }, []);

  return (
    <>
      <div className="container home-body">
        <div className="row">
          <HomeLeftSection val="none" />

          <div className="col-7 home-right-section pt-3 ps-5 ">
            <div className="home-right-top-part d-flex justify-content-between align-items-center mb-4">
              <h2>Tweet Replies</h2>
            </div>

            <div className="main-content">
              <TweetCard val={singleTweet} />
              <h4 className="mt-5 mb-3">Replies</h4>
              {tweetReplies?.map((val) => {
                return <TweetCard val={val} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TweetReplies;
