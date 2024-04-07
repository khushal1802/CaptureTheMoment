import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  DELETE_PRESS_PROGRESS,
  GET_PRESS_PROGRESS,
  POST_PRESS_PROGRESS,
  UPDATE_PRESS_PROGRESS,
} from "../../../redux-saga/Admin/press/pressAction";

import "react-toastify/dist/ReactToastify.css";
import { LoaderContext } from "../../../LoaderContext";
import ScrollAnimation from "react-animate-on-scroll";

function PressA() {
  const { setloader } = React.useContext(LoaderContext);

  const name = useRef();
  const press = useRef();
  const title = useRef();
  const dec = useRef();
  const [view, setView] = useState({
    name: "",
    press: "",
    description: "",
    title: "",
  });
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
    title: "",
    image: "",
    description: "",
  });

  const Press = useSelector((state) => state.pressReducer.press);
  const dispatch = useDispatch();

  useEffect(() => {
    setloader(true);
    dispatch({ type: GET_PRESS_PROGRESS });
    setTimeout(() => {
      setloader(false);
    }, 1000);
  }, []);

  const validateForm = () => {
    setErrors({
      name: name.current.value ? "" : "Name is required",
      title: title.current.value ? "" : "Title is required",
      image: press.current.files[0] ? "" : "Image is required",
      description: dec.current.value ? "" : "Description is required",
    });

    return title.current.value && press.current.files[0] && dec.current.value;
  };

  const handalSubmit = () => {
    const isValid = validateForm();

    if (isValid) {
      const formData = new FormData();
      formData.append("name", name.current.value);
      formData.append("press", press.current.files[0]);
      formData.append("description", dec.current.value);
      formData.append("title", title.current.value);

      dispatch({
        type: POST_PRESS_PROGRESS,
        payload: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Press added successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      press.current.value = "";
      setView({
        name: "",
        description: "",
        title: "",
      });
    }
  };

  const handalDelete = (val) => {
    console.log(val._id);
    toast.success("Press deleted successfully", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    dispatch({
      type: DELETE_PRESS_PROGRESS,
      payload: val,
    });
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
      image: e.target.files[0],
    }));
  };

  const handleUpdate = () => {
    const isValid = validateForm();

    if (isValid) {
      const formData = new FormData();
      formData.append("name", view.name);
      formData.append("press", view.image);
      formData.append("description", view.description);
      formData.append("title", view.title);
      dispatch({
        type: UPDATE_PRESS_PROGRESS,
        payload: { view, formData },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Press updated successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      press.current.value = "";
      setView({
        name: "",
        press: "",
        description: "",
        title: "",
      });
    }
  };

  return (
    <div style={{ padding: "1.5vw 4vw" }}>
      <ScrollAnimation animateIn="slideInDown">
        <div className="admin-page-heading">
          <h2 style={{ fontWeight: "700" }}>Press Section</h2>
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
              {/* Modal Header */}
              <div className="modal-header">
                <h4 className="modal-title">
                  {isAdding ? "Create" : "Update"} Press
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              {/* Modal Body */}
              <div className="modal-body">
                <form>
                  Name:
                  <br />
                  <input
                    className="mb-3 fild"
                    type="text"
                    id="name"
                    name="name"
                    ref={name}
                    onChange={handleInputChange}
                    value={view.name}
                    style={{ width: "100%" }}
                  />
                  <span className="error-message" style={{ color: "red" }}>
                    {errors.name}
                  </span>
                  <br />
                  Image:
                  <br />
                  <input
                    className="mb-3 fild"
                    type="file"
                    id="press"
                    name="press"
                    ref={press}
                    onChange={handleFileChange}
                    style={{ width: "100%" }}
                  />
                  <span className="error-message" style={{ color: "red" }}>
                    {errors.image}
                  </span>
                  <br />
                  Title:
                  <br />
                  <input
                    className="mb-3"
                    type="text"
                    id="title"
                    name="title"
                    ref={title}
                    onChange={handleInputChange}
                    value={view.title}
                    style={{ width: "100%" }}
                  />
                  <span className="error-message" style={{ color: "red" }}>
                    {errors.title}
                  </span>
                  <br />
                  Description:
                  <br />
                  <input
                    className="mb-3"
                    type="text"
                    id="dec"
                    name="description"
                    ref={dec}
                    onChange={handleInputChange}
                    value={view.description}
                    style={{ width: "100%" }}
                  />
                  <span className="error-message" style={{ color: "red" }}>
                    {errors.description}
                  </span>
                  <br />
                </form>
              </div>

              {/* Modal Footer */}
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

        <div>
          <div className="">
            <div className="row gy-4">
              {Press?.map((val, ind) => (
                <div className="col-lg-4 col-md-6 col-sm-12" key={ind}>
                  <ScrollAnimation animateIn="zoomIn">
                    <div className="card">
                      <img
                        className="blog-item-img"
                        src={val.image}
                        alt="blog-item-img"
                        style={{ aspectRatio: "1/0.9" }}
                      />
                      <div className="card-body" style={{height:"180px"}}>
                        {/* <span className="blog-item-label">News</span> */}
                        <span>{val.name}</span>
                        <h5
                          style={{
                            marginTop: "10px",
                            marginBottom: "5px",
                            fontWeight: "700",
                          }}
                        >
                          {val.title}
                        </h5>
                        <p>{val.description}</p>
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
          </div>
        </div>
      </section>
    </div>
  );
}

export default PressA;
