import React, { useEffect } from "react";
import "./components.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import coupleImage from "../User/Images/photographer_1.jpg";
import coupleImage2 from "../User/Images/photographer_2.jpg";
import quote from "../User/Images/quote.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GET_COMMENT_PROGRESS } from "../../redux-saga/Admin/comment/commentAction";
import { LoaderContext } from "../../LoaderContext";
import ScrollAnimation from "react-animate-on-scroll";

function Comments() {
  const { setloader } = React.useContext(LoaderContext);

  const Comment = useSelector((state) => state.commentReducer.comment);
  const last = Comment.slice(-4);
  const dispatch = useDispatch();

  useEffect(() => {
    setloader(true);
    dispatch({ type: GET_COMMENT_PROGRESS });
    setTimeout(() => {
      setloader(false);
    }, 1500);
  }, []);
  return (
    <section className="comment-section">
      <ScrollAnimation animateIn="slideInDown">
        <div className="comment-heading">
          <div className="left-heading-section">
            <div className="first-heading">
              <div className="heading-line"></div>
              <p>Testimonials</p>
              <div className="heading-line"></div>
            </div>
            <h1>What's Couple Say.</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              repellat eos iste qui doloribus aliquam.
            </p>
          </div>

          <div className="right-heading-section">
            <Link to={"/addcomment"} className="open-link">
              <button className="addComment">
                <i className="ri-chat-heart-line"></i>
                <p>Add Comment</p>
              </button>
            </Link>
          </div>
        </div>
      </ScrollAnimation>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        fadeEffect={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: false,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="comment-slider"
        style={{
          "--swiper-pagination-color": "var(--main-color)",
          // "--swiper-pagination-color": "#fff",
          // "--swiper-navigation-color": "#fff",
        }}
      >
        {last?.map((val, ind) => {
          return (
            <SwiperSlide className="comment-slider-slide" key={ind}>
              <div className="comment-content">
                {/* left */}
                <ScrollAnimation animateIn="slideInLeft">
                  <div className="left-comment-content-section">
                    <div className="couple-image">
                      <img src={val.image} alt="couple_image" />
                    </div>
                  </div>
                </ScrollAnimation>
                {/* right */}
                <ScrollAnimation animateIn="slideInRight">
                  <div className="right-comment-content-section">
                    <img src={quote} alt="quote" className="quote" />
                    <p className="couple-comment">{val.description}</p>
                    <div className="couple-name">
                      <div className="line"></div>
                      <p className="couple">{val.name}</p>
                      <div className="line"></div>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

export default Comments;
