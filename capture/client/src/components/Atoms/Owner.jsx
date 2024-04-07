import React from "react";
import "./components.css";
// import photoGrapher1 from '../User/Images/photographer_1.jpg'
// import photoGrapher2 from '../User/Images/photographer_2.jpg'
import ownder1 from "../User/Images/owner-1.jpg";
import ownder2 from "../User/Images/owner-2.jpg";
import ownder3 from "../User/Images/owner-3.jpg";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ScrollAnimation from "react-animate-on-scroll";

function Owner() {
  return (
    <section className="owner-section">
      <ScrollAnimation animateIn="slideInDown">
        <div className="owner-heading-section">
          <h1>Owner Information</h1>
          <div className="small-heading">
            <div className="heading-line"></div>
            <p>Over Owner Information</p>
            <div className="heading-line"></div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            repellat eos iste qui doloribus aliquam.
          </p>
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
        style={{
          "--swiper-pagination-color": "var(--main-color)",
          // "--swiper-pagination-color": "#fff",
          // "--swiper-navigation-color": "#fff",
        }}
        className="owner-slide"
      >
        {/* (1) */}
        <SwiperSlide className="owner-slider-slide">
          <div className="owner-photographer">
            {/* owner-left */}
            <div className="owner-left">
              <div className="photographer-image">
                <img src={ownder1} alt="ownder1" />
              </div>
            </div>

            {/* owner-right */}
            <div className="owner-right">
              <div className="photographer-info-heading">
                <h1>I'am Jenil Savani</h1>
                <h3>
                  He is the <span>Manager</span> of the <span>Studio</span> .
                </h3>
                <p>
                  As the cornerstone of studio operations, Jenil Savani embodies
                  unparalleled leadership, ensuring seamless execution of
                  creative projects while nurturing a culture of excellence.
                  Their adept management skills transcend the studio walls,
                  fostering collaboration and driving innovation, making them
                  the epitome of a visionary studio manager.
                </p>
              </div>

              <div className="photographer-info-section">
                <h2>Information</h2>
                <div className="photographer-info">
                  <p>
                    Name &nbsp; : &nbsp; <span>Jenil Savani</span>
                  </p>
                  <p>
                    Phone &nbsp; : &nbsp; <span>+91 8769435675</span>
                  </p>
                  <p>
                    Email &nbsp; : &nbsp; <span>jenil23@gamil.com</span>
                  </p>
                  <p>
                    Experience &nbsp; : &nbsp; <span>8 Years</span>
                  </p>
                  <p>
                    Expertise &nbsp; : &nbsp;{" "}
                    <span>Managment and social media heading</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* (2) */}
        <SwiperSlide className="owner-slider-slide">
          <div className="owner-photographer">
            {/* owner-left */}
            <div className="owner-left">
              <div className="photographer-image">
                <img src={ownder2} alt="ownder2" />
              </div>
            </div>

            {/* owner-right */}
            <div className="owner-right">
              <div className="photographer-info-heading">
                <h1>I'am Khushal Vaghasiya</h1>
                <h3>
                  A Lead <span>Videographer</span> based on <span>Surat</span> .
                </h3>
                <p>
                  Capturing moments with unparalleled artistry, Khushal
                  Vaghasiya elevates photography beyond mere images, crafting
                  timeless masterpieces. Their skill transcends the confines of
                  a studio, transforming ordinary scenes into extraordinary
                  narratives, making them the epitome of a visionary
                  photographer.
                </p>
              </div>

              <div className="photographer-info-section">
                <h2>Information</h2>
                <div className="photographer-info">
                  <p>
                    Name &nbsp; : &nbsp; <span>Khushal Vaghasiya</span>
                  </p>
                  <p>
                    Phone &nbsp; : &nbsp; <span>+91 8564567456</span>
                  </p>
                  <p>
                    Email &nbsp; : &nbsp; <span>Khushal18@gamil.com</span>
                  </p>
                  <p>
                    Experience &nbsp; : &nbsp; <span>6 Years</span>
                  </p>
                  <p>
                    Expertise &nbsp; : &nbsp; <span>Videographer</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* (3) */}
        <SwiperSlide className="owner-slider-slide">
          <div className="owner-photographer">
            {/* owner-left */}
            <div className="owner-left">
              <div className="photographer-image">
                <img src={ownder3} alt="ownder3" />
              </div>
            </div>

            {/* owner-right */}
            <div className="owner-right">
              <div className="photographer-info-heading">
                <h1>I'am Darshan Virani</h1>
                <h3>
                  A Lead <span>Photographer</span> based on <span>Surat</span> .
                </h3>
                <p>
                  Renowned for their cinematic brilliance, Darshan Virani is not
                  just a videographer but a storyteller extraordinaire. Their
                  ability to weave emotion and narrative seamlessly into every
                  frame transcends the limitations of a studio, creating
                  immersive visual experiences that linger long after the screen
                  fades to black.
                </p>
              </div>

              <div className="photographer-info-section">
                <h2>Information</h2>
                <div className="photographer-info">
                  <p>
                    Name &nbsp; : &nbsp; <span>Darshan Virani</span>
                  </p>
                  <p>
                    Phone &nbsp; : &nbsp; <span>+91 9654674567</span>
                  </p>
                  <p>
                    Email &nbsp; : &nbsp; <span>darshan21@gamil.com</span>
                  </p>
                  <p>
                    Experience &nbsp; : &nbsp; <span>4 Years</span>
                  </p>
                  <p>
                    Expertise &nbsp; : &nbsp; <span>Photographer</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default Owner;
