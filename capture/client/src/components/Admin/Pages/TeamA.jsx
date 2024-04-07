import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  DELETE_TEAM_PROGRESS,
  GET_TEAM_PROGRESS,
  POST_TEAM_PROGRESS,
  UPDATE_TEAM_PROGRESS,
} from "../../../redux-saga/Admin/team/teamAction";

import "react-toastify/dist/ReactToastify.css";
import { LoaderContext } from "../../../LoaderContext";
import ScrollAnimation from "react-animate-on-scroll";

function TeamA() {
  const { setloader } = React.useContext(LoaderContext)

  const name = useRef();
  const photo = useRef();
  const role = useRef();
  const dec = useRef();
  const [view, setView] = useState({
    name: "",
    photo: "",
    description: "",
    role: "",
  });
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
    photo: "",
    description: "",
    role: "",
  });

  const Team = useSelector((state) => state.teamReducer.team);
  const dispatch = useDispatch();

  useEffect(() => {
    setloader(true)
    dispatch({ type: GET_TEAM_PROGRESS });
    setTimeout(() => { setloader(false) }, 1000)
  }, []);

  const validateForm = () => {
    setErrors({
      name: name.current.value ? "" : "Name is required",
      photo: photo.current.files[0] ? "" : "Photo is required",
      description: dec.current.value ? "" : "Description is required",
      role: role.current.value ? "" : "Role is required",
    });

    return (
      name.current.value &&
      photo.current.files[0] &&
      dec.current.value &&
      role.current.value
    );
  };

  const handalSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name.current.value);
    formData.append("photo", photo.current.files[0]);
    formData.append("description", dec.current.value);
    formData.append("role", role.current.value);

    dispatch({
      type: POST_TEAM_PROGRESS,
      payload: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Clear form fields after submission
    name.current.value = "";
    photo.current.value = "";
    dec.current.value = "";
    role.current.value = "";

    setView({
      name: "",
      photo: "",
      description: "",
      role: "",
    });

    toast.success("Team added successfully", {
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
      type: DELETE_TEAM_PROGRESS,
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
      photo: e.target.files[0],
    }));
  };

  const handleUpdate = () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("name", view.name);
    formData.append("photo", view.photo);
    formData.append("description", view.description);
    formData.append("role", view.role);

    dispatch({
      type: UPDATE_TEAM_PROGRESS,
      payload: { view, formData },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Clear form fields after update
    name.current.value = "";
    photo.current.value = "";
    dec.current.value = "";
    role.current.value = "";

    setView({
      name: "",
      photo: "",
      description: "",
      role: "",
    });

    toast.success("Team updated successfully", {
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

  return (
    <div style={{padding: "1.5vw 4vw"}}>
                <ScrollAnimation animateIn="slideInDown">

      <div className="admin-page-heading">
        <h2 style={{fontWeight: "700"}}>Our Photography Team</h2>
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
                  {isAdding ? "Create" : "Update"} Team
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
                  Photo:
                  <br />
                  <input
                    className={`mb-3 fild ${errors.photo ? "is-invalid" : ""}`}
                    type="file"
                    id="photo"
                    name="photo"
                    ref={photo}
                    onChange={handleFileChange}
                    style={{ width: "100%" }}
                  />
                  <div className="invalid-feedback">{errors.photo}</div>
                  <br />
                  Role:
                  <br />
                  <input
                    className={`mb-3 ${errors.role ? "is-invalid" : ""}`}
                    type="text"
                    id="role"
                    name="role"
                    ref={role}
                    onChange={handleInputChange}
                    value={view.role}
                    style={{ width: "100%" }}
                  />
                  <div className="invalid-feedback">{errors.role}</div>
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
        <div>
          <div>
            <div className="row gy-4">
              {Team?.map((val, ind) => (
                <div className="col-lg-4 col-md-6 col-sm-12" key={ind}>
                        <ScrollAnimation animateIn="zoomIn">

                  <div className="blog-item-content card ">
                    <img
                      className="blog-item-img"
                      src={val.photo}
                      alt="blog-item-img"
                    />
                    <div className="card-body" style={{height:"210px"}}>
                      <span className="blog-item-label">{val.role}</span>
                      <h4 style={{marginTop: "10px", fontWeight: "700"}}>{val.name}</h4>
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

export default TeamA;
