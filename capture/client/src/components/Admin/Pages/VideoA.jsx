import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_VIDEO_PROGRESS,
  GET_VIDEO_PROGRESS,
  POST_VIDEO_PROGRESS,
  UPDATE_VIDEO_PROGRESS,
} from "../../../redux-saga/Admin/video/videoAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoaderContext } from "../../../LoaderContext";
import ScrollAnimation from "react-animate-on-scroll";

function VideoA() {
  const { setloader } = React.useContext(LoaderContext);

  const name = useRef();
  const video = useRef();
  const dec = useRef();
  const [view, setView] = useState({
    name: "",
    video: "",
    description: "",
  });
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [errors, setErrors] = useState({
    title: "",
    image: "",
    description: "",
  });

  const Video = useSelector((state) => state.videoReducer.video);
  const dispatch = useDispatch();

  useEffect(() => {
    setloader(true);
    dispatch({ type: GET_VIDEO_PROGRESS });
    setTimeout(() => {
      setloader(false);
    }, 1000);
  }, []);

  const validateForm = () => {
    setErrors({
      title: name.current.value ? "" : "Title is required",
      image: video.current.files[0] ? "" : "Image is required",
      description: dec.current.value ? "" : "Description is required",
    });

    return name.current.value && video.current.files[0] && dec.current.value;
  };

  const notifySuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  const handalSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name.current.value);
    formData.append("video", video.current.files[0]);
    formData.append("description", dec.current.value);

    dispatch({
      type: POST_VIDEO_PROGRESS,
      payload: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    notifySuccess("Video added successfully");

    clearFormInputs();
  };

  const handalDelete = (val) => {
    dispatch({
      type: DELETE_VIDEO_PROGRESS,
      payload: val,
    });

    notifySuccess("Video deleted successfully");
  };

  const handleView = (val) => {
    setView(val);
    setIsAdding(false);
    setViewModalVisible(true);
  };

  const handleInputChange = (e) => {
    setView((prevView) => ({
      ...prevView,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setView((prevView) => ({
      ...prevView,
      video: e.target.files[0],
    }));
  };

  const handleUpdate = () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("name", view.name);
    formData.append("video", view.video);
    formData.append("description", view.description);

    dispatch({
      type: UPDATE_VIDEO_PROGRESS,
      payload: { view, formData },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    notifySuccess("Video updated successfully");

    clearFormInputs();
  };

  const clearFormInputs = () => {
    name.current.value = "";
    video.current.value = "";
    dec.current.value = "";
    setView({
      name: "",
      video: "",
      description: "",
    });
    setErrors({
      title: "",
      image: "",
      description: "",
    });
  };

  return (
    <div style={{ padding: "1.5vw 4vw" }}>
      <ScrollAnimation animateIn="slideInDown">
        <div className="admin-page-heading">
          <h2 style={{ fontWeight: "700" }}>Couple Videography</h2>
          <button
            type="button"
            id="all-add-btn"
            data-bs-toggle="modal"
            data-bs-target="#myModal"
            onClick={() => setIsAdding(true)}
          >
            Add <i className="ri-add-line"></i>
          </button>
        </div>
      </ScrollAnimation>
      <section>
        <div
          className={`modal ${viewModalVisible ? "show" : ""}`}
          id="myModal"
          tabIndex="-1"
          role="dialog"
          style={{ display: viewModalVisible ? "block" : "none" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">
                  {isAdding ? "Create" : "Update"} Video
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">
                <form>
                  Video Name:
                  <br />
                  <input
                    className={`mb-3 fild ${errors.title ? "is-invalid" : ""}`}
                    type="text"
                    id="name"
                    name="name"
                    ref={name}
                    onChange={handleInputChange}
                    value={view.name}
                    style={{ width: "100%" }}
                  />
                  <span className="text-danger">{errors.title}</span>
                  <br />
                  Video:
                  <br />
                  <input
                    className={`mb-3 fild ${errors.image ? "is-invalid" : ""}`}
                    type="file"
                    id="video"
                    name="video"
                    ref={video}
                    onChange={handleFileChange}
                    style={{ width: "100%" }}
                  />
                  <span className="text-danger">{errors.image}</span>
                  <br />
                  Description:
                  <br />
                  <input
                    className={`mb-3 ${errors.description ? "is-invalid" : ""}`}
                    type="text"
                    id="dec"
                    name="description"
                    ref={dec}
                    onChange={handleInputChange}
                    value={view.description}
                    style={{ width: "100%" }}
                  />
                  <span className="text-danger">{errors.description}</span>
                  <br />
                </form>
              </div>

              <div className="modal-footer">
                {isAdding ? (
                  <input
                    type="submit"
                    className="main m-2"
                    value="Submit"
                    onClick={handalSubmit}
                  />
                ) : (
                  <input
                    type="submit"
                    className="main m-2"
                    value="Update"
                    onClick={handleUpdate}
                  />
                )}
                <button
                  type="button"
                  className="main m-0"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row gy-4">
          {Video?.map((val, ind) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={ind}>
              <ScrollAnimation animateIn="zoomIn">
                <div className="card">
                  <video className="card-img-top" autoPlay muted loop>
                    <source src={val.video} type="video/mp4" alt="video" />
                  </video>
                  <div className="card-body" style={{height:"180px"}}>
                    <h5
                      style={{ fontWeight: "700", marginBottom: "5px" }}
                      className="card-title"
                    >
                      {val.name}
                    </h5>
                    <p className="card-text">{val.description}</p>
                   <div className="edit">
                   <button
                      className="deleteBtn"
                      style={{ margin: "0px", marginRight: "15px" }}
                      onClick={() => handalDelete(val)}
                    >
                      Delete
                    </button>
                    <button
                      className="viewBtn"
                      style={{ margin: "0px" }}
                      onClick={() => handleView(val)}
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                    >
                      Update
                    </button>
                   </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default VideoA;
