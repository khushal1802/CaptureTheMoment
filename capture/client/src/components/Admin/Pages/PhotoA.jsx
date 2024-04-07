import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_PHOTO_PROGRESS,
  GET_PHOTO_PROGRESS,
  POST_PHOTO_PROGRESS,
  UPDATE_PHOTO_PROGRESS,
} from "../../../redux-saga/Admin/photo/photoAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoaderContext } from "../../../LoaderContext";
import ScrollAnimation from "react-animate-on-scroll";

function PhotoA() {
  const { setloader } = React.useContext(LoaderContext)
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

  // Define initial state for resetting input fields
  const initialInputState = {
    name: "",
    image: "",
    description: "",
  };

  const Photo = useSelector((state) => state.photoReducer.photo);
  const dispatch = useDispatch();
  useEffect(() => {
    setloader(true)
    dispatch({ type: GET_PHOTO_PROGRESS });
    setTimeout(() => { setloader(false) }, 1000)
  }, []);

  const handalSubmit = () => {
    setErrors({
      name: name.current.value ? "" : "Name is required",
      image: img.current.files[0] ? "" : "Image is required",
      description: dec.current.value ? "" : "Description is required",
    });

    if (!name.current.value || !img.current.files[0] || !dec.current.value) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name.current.value);
    formData.append("image", img.current.files[0]);
    formData.append("description", dec.current.value);

    dispatch({
      type: POST_PHOTO_PROGRESS,
      payload: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Reset input fields after successful submission
    img.current.value = ""; // Clear the image input field
    setView(initialInputState);

    toast.success("Photo added successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  const handalDelete = (val) => {
    dispatch({
      type: DELETE_PHOTO_PROGRESS,
      payload: val,
    });

    toast.success("Your file has been deleted.", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
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
    setErrors({
      name: view.name ? "" : "Name is required",
      image: view.image ? "" : "Image is required",
      description: view.description ? "" : "Description is required",
    });

    if (!view.name || !view.image || !view.description) {
      return;
    }

    const formData = new FormData();
    formData.append("name", view.name);
    formData.append("image", view.image);
    formData.append("description", view.description);

    dispatch({
      type: UPDATE_PHOTO_PROGRESS,
      payload: { formData, view },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Reset input fields after successful update
    img.current.value = ""; // Clear the image input field
    setView(initialInputState);

    toast.success("Photo updated successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  return (
    <div style={{padding: "1.5vw 4vw"}}>
          <ScrollAnimation animateIn="slideInDown">

      <div className="admin-page-heading">
        <h2 style={{fontWeight: "700"}}>Couple Photography</h2>
          <button
            type="button"
            id="all-add-btn"
            data-bs-toggle="modal"
            data-bs-target="#myModal"
            onClick={() => setIsAdding(true)}
            >Add <i className="ri-add-line"></i>
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
                  {isAdding ? "Create" : "Update"} Image
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">
                <form>
                  Image Name:
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
          {Photo?.map((val, ind) => (
            
            <div className="col-lg-4 col-md-6 col-sm-12" key={ind}>
              <ScrollAnimation animateIn="zoomIn">
              <div className="card h-100">
                <img
                  className="card-img-top"
                  src={val.image}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h4 className="card-title">
                    {val.name}
                  </h4>
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

export default PhotoA;
