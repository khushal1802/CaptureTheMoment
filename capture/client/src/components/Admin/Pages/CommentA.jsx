import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_COMMENT_PROGRESS,
  GET_COMMENT_PROGRESS,
  POST_COMMENT_PROGRESS,
  UPDATE_COMMENT_PROGRESS,
} from "../../../redux-saga/Admin/comment/commentAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoaderContext } from "../../../LoaderContext";
import ScrollAnimation from "react-animate-on-scroll";

function CommentA() {
  const { setloader } = React.useContext(LoaderContext);

  const name = useRef();
  const img = useRef();
  const dec = useRef();
  const [view, setView] = useState({
    name: "",
    image: "",
    description: "",
  });
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    description: "",
  });

  const Comment = useSelector((state) => state.commentReducer.comment);
  const dispatch = useDispatch();

  useEffect(() => {
    setloader(true);
    dispatch({ type: GET_COMMENT_PROGRESS });
    setTimeout(() => {
      setloader(false);
    }, 1000);
  }, []);

  const validateForm = () => {
    setErrors({
      name: name.current.value ? "" : "Name is required",
      image: img.current.files[0] ? "" : "Image is required",
      description: dec.current.value ? "" : "Description is required",
    });

    return name.current.value && img.current.files[0] && dec.current.value;
  };

  const handalSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name.current.value);
    formData.append("image", img.current.files[0]);
    formData.append("description", dec.current.value);

    dispatch({
      type: POST_COMMENT_PROGRESS,
      payload: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    img.current.value = ""; // Clear the image input field
    setView({
      name: "",
      image: "",
      description: "",
    });

    toast.success("Comment added successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handalDelete = (val) => {
    dispatch({
      type: DELETE_COMMENT_PROGRESS,
      payload: val,
    });

    toast.success("Your file has been deleted.", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
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
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("name", view.name);
    formData.append("image", view.image);
    formData.append("description", view.description);

    dispatch({
      type: UPDATE_COMMENT_PROGRESS,
      payload: { view, formData },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Reset input fields and errors after a successful update
    img.current.value = ""; // Clear the image input field
    setView({
      name: "",
      image: "",
      description: "",
    });

    toast.success("Comment updated successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    img.current.value = ""; // Clear the image input field
    setView({
      name: "",
      image: "",
      description: "",
    });
  };

  return (
    <div style={{ padding: "1.5vw 4vw" }}>
      <ScrollAnimation animateIn="slideInDown">
        <div className="admin-page-heading">
          <h2 style={{ fontWeight: "700" }}>Couple Comments</h2>
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
                  {isAdding ? "Create" : "Update"} Comment
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">
                <form>
                  Name:
                  <br />
                  <input
                    className={`mb-3 fild ${errors.name ? "is-invalid" : ""}`}
                    type="text"
                    id="name"
                    name="name"
                    ref={name}
                    onChange={handleInputChange}
                    value={view.name}
                    style={{ width: "100%" }}
                  />
                  <div className="invalid-feedback">{errors.name}</div>
                  <br />
                  Image:
                  <br />
                  <input
                    className={`mb-3 fild ${errors.image ? "is-invalid" : ""}`}
                    type="file"
                    id="img"
                    name="img"
                    ref={img}
                    onChange={handleFileChange}
                    style={{ width: "100%" }}
                  />
                  <div className="invalid-feedback">{errors.image}</div>
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
                  <div className="invalid-feedback">{errors.description}</div>
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
          {Comment?.map((val, ind) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={ind}>
              <ScrollAnimation animateIn="zoomIn">
                <div className="card h-100">
                  <img
                    className="card-img-top"
                    src={val.image}
                    alt="Card image cap"
                  />
                  <div className="card-body" style={{height:"240px"}}>
                    <h5
                      style={{ marginBottom: "5px", fontWeight: "700" }}
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

export default CommentA;
