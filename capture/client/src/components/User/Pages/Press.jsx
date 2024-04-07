import React, { useEffect } from "react";
import "../CSS/user.css";
import pressPhoto from "../Images/press-photo.jpg";
import Footer from "../../Atoms/Footer";
import { useDispatch, useSelector } from "react-redux";
import { GET_PRESS_PROGRESS } from "../../../redux-saga/Admin/press/pressAction";
import { LoaderContext } from "../../../LoaderContext";
import ScrollAnimation from "react-animate-on-scroll";

function Press() {
  const { setloader } = React.useContext(LoaderContext);

  const Press = useSelector((state) => state.pressReducer.press);
  const dispatch = useDispatch();

  useEffect(() => {
    setloader(true);
    dispatch({ type: GET_PRESS_PROGRESS });
    setTimeout(() => {
      setloader(false);
    }, 2000);
  }, []);
  return (
    <div>
      <div className="press-section" style={{ padding: "3vw 5vw" }}>
        <ScrollAnimation animateIn="slideInDown">
          <div className="press-wedding-image">
            <img src={pressPhoto} alt="" />
          </div>
        </ScrollAnimation>

        {/* Press heading */}
        <ScrollAnimation animateIn="zoomIn">
          <div className="press-heading-section">
            <div className="press-head">
              <div className="press-line"></div>
              <h5>Press</h5>
              <div className="press-line"></div>
            </div>
            <h1>We've been featured!</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Temporibus sequi voluptate quam odit necessitatibus, veniam at
              impedit sapiente iusto, accusantium deserunt nihil illo accusamus
              reprehenderit aliquam porro soluta! Possimus, pariatur.
            </p>
          </div>
        </ScrollAnimation>
        {/* press */}
        <div className="press">
          {Press?.map((val, ind) => {
            return (
              <ScrollAnimation animateIn="zoomIn">
                <div className="press-card">
                  <div className="press-image">
                    <img src={val.image} alt="Press_image" />
                  </div>
                  <div className="press-info">
                    <p className="press-name">{val.name}</p>
                    <h4 className="press-title">{val.title}</h4>
                    <p className="press-discription">{val.description}</p>
                  </div>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Press;
