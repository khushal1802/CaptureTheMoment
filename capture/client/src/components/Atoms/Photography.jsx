import "./components.css";
// import couplePhotographs from '../User/Images/photographer_1.jpg';
// import couplePhotographs2 from '../User/Images/photographer_2.jpg';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_PHOTO_PROGRESS } from "../../redux-saga/Admin/photo/photoAction";
import ScrollAnimation from "react-animate-on-scroll";

function Photography() {
  const [image, setimage] = useState("");
  const Photo = useSelector((state) => state.photoReducer.photo);
  const dispatch = useDispatch();

  const last = Photo.slice(-20);
  console.log(last);
  useEffect(() => {
    dispatch({ type: GET_PHOTO_PROGRESS });
  }, []);
  return (
    <section className="photography-section">
      <ScrollAnimation animateIn="slideInDown">
        <div className="photography-heading-section">
          <div className="small-heading">
            <div className="heading-line"></div>
            <p>Over Best Wedding Photography</p>
            <div className="heading-line"></div>
          </div>
          <h1>Wedding Photography Showcase</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur, rem? Porro nobis tempora debitis ipsam. Voluptatum
            recusandae mollitia quibusdam accusantium eaque impedit
            reprehenderit nobis ipsam sequi magni? Exercitationem, inventore
            autem?
          </p>
        </div>
      </ScrollAnimation>

      <div className="couple-photographs-section">
        {last.map((val, ind) => {
          return (
            <ScrollAnimation animateIn="zoomIn">
              <div
                className="couple-photographs"
                key={ind}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                onClick={() => {
                  setimage(val.image);
                }}
              >
                <img src={val.image} alt="couple_Photographs" />
                <i className="ri-focus-mode focus"></i>
              </div>
            </ScrollAnimation>
          );
        })}

        {/* Model Box */}
        <div
          className="modal fade photo-viewer"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="image">
                  <img src={image} alt="Couple_image" />
                </div>
              </div>
              <div className="modal-footer">
                <div className="close-btn" data-bs-dismiss="modal">
                  <i className="ri-close-line"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Photography;
