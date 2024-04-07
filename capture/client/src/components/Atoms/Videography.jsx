import { useDispatch, useSelector } from "react-redux";
import "./components.css";
import { useEffect } from "react";
import { GET_VIDEO_PROGRESS } from "../../redux-saga/Admin/video/videoAction";
import ScrollAnimation from "react-animate-on-scroll";

function Videography() {
  const Video = useSelector((state) => state.videoReducer.video);
  const dispatch = useDispatch();
  const last = Video.slice(-2);
  useEffect(() => {
    dispatch({ type: GET_VIDEO_PROGRESS });
  }, []);
  return (
    <section className="video-section">
      {/* video-heading-section */}
      <ScrollAnimation animateIn="slideInDown">
        <div className="video-heading-section">
          <div className="small-heading">
            <div className="heading-line"></div>
            <p>Over Best Wedding Video</p>
            <div className="heading-line"></div>
          </div>
          <h1>Videography</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
            inventore dolores architecto eaque tenetur vel ipsam accusantium,
            possimus ut corporis doloribus? Minima accusamus ipsam nihil odio,
            officiis perferendis dolore sapiente aliquid! Accusamus enim
            officiis maiores unde sed est porro quos beatae quaerat pariatur,
            laudantium distinctio culpa rem sint, harum sequi.
          </p>
        </div>
      </ScrollAnimation>
      <div className="videography">
        {last?.map((val, ind) => {
          return (
            <ScrollAnimation animateIn="zoomIn">
              <div className="wedding-video-section" key={ind}>
                <div className="top-section">
                  <video controls muted autoPlay>
                    <source src={val.video} type="video/mp4" />
                  </video>
                </div>
                <div className="bottom-section">
                  <p className="couple-name">{val.name}</p>
                  <p className="discription">{val.description}</p>
                </div>
              </div>
            </ScrollAnimation>
          );
        })}
      </div>
    </section>
  );
}

export default Videography;
