import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/user.css";
import { useDispatch, useSelector } from "react-redux";
import { GET_PACKAGE_PROGRESS } from "../../../redux-saga/Admin/package/packageAction";
import { LoaderContext } from "../../../LoaderContext";
import Cookies from "js-cookie";
import photographyPackage from "../Images/photographyPackage.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Footer from "../../Atoms/Footer";
import ScrollAnimation from "react-animate-on-scroll";

function UserPackage() {
  const { setloader } = React.useContext(LoaderContext);
  const navigate = useNavigate();
  const Package = useSelector((state) => state.packageReducer.package);
  const dispatch = useDispatch();

  useEffect(() => {
    setloader(true);
    dispatch({ type: GET_PACKAGE_PROGRESS });
    setTimeout(() => {
      setloader(false);
    }, 2000);
  }, []);

  const handalBay = (val) => {
    Cookies.set("payment_price", val.price);
    Cookies.set("payment_title", val.title);
    navigate("/CheckoutForm");
  };

  return (
    <div>
      <div className="package-section">
      <ScrollAnimation animateIn="slideInDown">

        <div className="photography-package-image">
          <img src={photographyPackage} alt="" />
        </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn="zoomIn">
          <div className="package-heading">
            <div className="inner-package-heading">
              <div className="package-line"></div>
              <p>Our Package</p>
              <div className="package-line"></div>
            </div>
            <h4>Out best Wedding Photography Package</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              dolor id eos eveniet quaerat ea qui fugiat nostrum iste
              consectetur atque illum voluptatibus neque eligendi, numquam
              praesentium nisi. Impedit nobis exercitationem earum eaque at
              laboriosam nostrum doloribus hic expedita sint suscipit dolorem,
              natus atque ex numquam, sed, placeat praesentium ratione!
            </p>
          </div>
        </ScrollAnimation>
        <div className="photography-package">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="package-slide"
            style={{
              "--swiper-pagination-color": "var(--main-color)",
            }}
          >
            {Package?.map((val, ind) => {
              return (
                <SwiperSlide className="package-card" key={ind}>
                  <div className="package-card-heading">
                    <h4 className="package-title">{val.title}</h4>
                    <h3 className="package-price">
                      <span style={{ paddingRight: "3px" }}>₹</span>
                      {val.price}
                      <span style={{ paddingLeft: "2px" }}>/-</span>
                    </h3>
                  </div>

                  <hr />

                  <div className="package-info">
                    <div className="package-info-list">
                      <i className="ri-checkbox-circle-line"></i>
                      <p>{val.hours}</p>
                    </div>
                    <div className="package-info-list">
                      <i className="ri-checkbox-circle-line"></i>
                      <p>{val.member}</p>
                    </div>
                    <div className="package-info-list">
                      <i className="ri-checkbox-circle-line"></i>
                      <p>{val.fild}</p>
                    </div>
                    <div className="package-info-list">
                      <i className="ri-checkbox-circle-line"></i>
                      <p>{val.type}</p>
                    </div>
                    <div className="package-info-list">
                      <i className="ri-checkbox-circle-line"></i>
                      <p>{val.album}</p>
                    </div>
                    <div className="package-info-list">
                      <i className="ri-checkbox-circle-line"></i>
                      <p>{val.description}</p>
                    </div>
                  </div>

                  <div className="buy-now">
                    <button
                      className="buy-now-btn"
                      onClick={() => handalBay(val)}
                    >
                      Buy Now
                    </button>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <ScrollAnimation animateIn="slideInDown">
          <div className="custorm-package">
            <div className="left-custorm-package-info">
              <h2>Custom Package</h2>
              <p>
                Create your personalized photography package by connecting
                directly with our studio. Tailor every aspect to suit your
                specific needs and preferences, ensuring a truly unique
                experience. Contact us today to discuss your requirements and
                let us design the perfect package just for you.
              </p>
            </div>
            <div className="right-custorm-package-info">
              <Link to="/contact" className="contactPageBtn">
                Contact Our Studio
              </Link>
            </div>
          </div>
        </ScrollAnimation>
      </div>

      <Footer />
    </div>
  );
}

export default UserPackage;
