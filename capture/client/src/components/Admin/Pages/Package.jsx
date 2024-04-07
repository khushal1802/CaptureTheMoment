import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  DELETE_PACKAGE_PROGRESS,
  GET_PACKAGE_PROGRESS,
  POST_PACKAGE_PROGRESS,
  UPDATE_PACKAGE_PROGRESS,
} from "../../../redux-saga/Admin/package/packageAction";

import "react-toastify/dist/ReactToastify.css";
import { LoaderContext } from "../../../LoaderContext";
import ScrollAnimation from "react-animate-on-scroll";

function Package() {
  const { setloader } = React.useContext(LoaderContext)

  const title = useRef();
  const fild = useRef();
  const type = useRef();
  const hours = useRef();
  const member = useRef();
  const album = useRef();
  const price = useRef();
  const dec = useRef();
  const [view, setView] = useState({
    title: "",
    price: "",
    fild: "",
    type: "",
    hours: "",
    member: "",
    album: "",
    description: "",
  });
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [validationErrors, setValidationErrors] = useState({
    title: "",
    price: "",
    fild: "",
    type: "",
    hours: "",
    member: "",
    album: "",
    description: "",
  });

  const Package = useSelector((state) => state.packageReducer.package);
  const dispatch = useDispatch();

  useEffect(() => {
    setloader(true)
    dispatch({ type: GET_PACKAGE_PROGRESS });
    setTimeout(() => { setloader(false) }, 1000)

  }, []);

  const validateForm = () => {
    const errors = {
      title: title.current.value.trim() === "" ? "Title is required" : "",
      price: price.current.value.trim() === "" ? "Price is required" : "",
      fild: fild.current.value.trim() === "" ? "Field is required" : "",
      type: type.current.value.trim() === "" ? "Type is required" : "",
      hours: hours.current.value.trim() === "" ? "Hours is required" : "",
      member: member.current.value.trim() === "" ? "Member is required" : "",
      album: album.current.value.trim() === "" ? "Album is required" : "",
      description:
        dec.current.value.trim() === "" ? "Description is required" : "",
    };

    setValidationErrors(errors);

    return Object.values(errors).every((error) => error === "");
  };

  const handalSubmit = () => {
    if (validateForm()) {
      const data = {
        title: title.current.value,
        price: price.current.value,
        fild: fild.current.value,
        type: type.current.value,
        hours: hours.current.value,
        member: member.current.value,
        album: album.current.value,
        description: dec.current.value,
      };

      dispatch({
        type: POST_PACKAGE_PROGRESS,
        payload: data,
      });

      toast.success("Package added successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      // Clear input fields after successful submission
      setView({
        title: "",
        price: "",
        fild: "",
        type: "",
        hours: "",
        member: "",
        album: "",
        description: "",
      });
    }
  };

  const handalDelete = (val) => {
    console.log(val._id);
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

    dispatch({
      type: DELETE_PACKAGE_PROGRESS,
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

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]:
        e.target.value.trim() === "" ? `${e.target.name} is required` : "",
    }));
  };

  const handleUpdate = () => {
    if (validateForm()) {
      dispatch({
        type: UPDATE_PACKAGE_PROGRESS,
        payload: view,
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Package updated successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setView({
        title: "",
        price: "",
        fild: "",
        type: "",
        hours: "",
        member: "",
        album: "",
        description: "",
      });
    }
  };

  return (
    <div style={{padding: "1.5vw 4vw"}}>
                <ScrollAnimation animateIn="slideInDown">

      <div className="admin-page-heading">
        <h2 style={{fontWeight: "700"}}>Photography Package</h2>
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
                  {isAdding ? "Create" : "Update"} Package
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">
                <form>
                  Title:
                  <br />
                  <input
                    className={`mb-3 fild ${
                      validationErrors.title ? "is-invalid" : ""
                    }`}
                    type="text"
                    id="title"
                    name="title"
                    ref={title}
                    onChange={handleInputChange}
                    value={view.title}
                    style={{ width: "100%" }}
                  />
                  <div className="invalid-feedback">
                    {validationErrors.title}
                  </div>
                  <br />
                  Price:
                  <br />
                  <input
                    className={`mb-3 fild ${
                      validationErrors.price ? "is-invalid" : ""
                    }`}
                    type="text"
                    id="price"
                    name="price"
                    ref={price}
                    onChange={handleInputChange}
                    value={view.price}
                    style={{ width: "100%" }}
                  />
                  <div className="invalid-feedback">
                    {validationErrors.price}
                  </div>
                  <br />
                  Fild:
                  <br />
                  <input
                    className={`mb-3 fild ${
                      validationErrors.fild ? "is-invalid" : ""
                    }`}
                    type="text"
                    id="fild"
                    name="fild"
                    ref={fild}
                    onChange={handleInputChange}
                    value={view.fild}
                    style={{ width: "100%" }}
                  />
                  <div className="invalid-feedback">
                    {validationErrors.fild}
                  </div>
                  <br />
                  Type:
                  <br />
                  <input
                    className={`mb-3 fild ${
                      validationErrors.type ? "is-invalid" : ""
                    }`}
                    type="text"
                    id="type"
                    name="type"
                    ref={type}
                    onChange={handleInputChange}
                    value={view.type}
                    style={{ width: "100%" }}
                  />
                  <div className="invalid-feedback">
                    {validationErrors.type}
                  </div>
                  <br />
                  Hours:
                  <br />
                  <input
                    className={`mb-3 fild ${
                      validationErrors.hours ? "is-invalid" : ""
                    }`}
                    type="text"
                    id="hours"
                    name="hours"
                    ref={hours}
                    onChange={handleInputChange}
                    value={view.hours}
                    style={{ width: "100%" }}
                  />
                  <div className="invalid-feedback">
                    {validationErrors.hours}
                  </div>
                  <br />
                  Member:
                  <br />
                  <input
                    className={`mb-3 fild ${
                      validationErrors.member ? "is-invalid" : ""
                    }`}
                    type="text"
                    id="member"
                    name="member"
                    ref={member}
                    onChange={handleInputChange}
                    value={view.member}
                    style={{ width: "100%" }}
                  />
                  <div className="invalid-feedback">
                    {validationErrors.member}
                  </div>
                  <br />
                  Album:
                  <br />
                  <input
                    className={`mb-3 fild ${
                      validationErrors.album ? "is-invalid" : ""
                    }`}
                    type="text"
                    id="album"
                    name="album"
                    ref={album}
                    onChange={handleInputChange}
                    value={view.album}
                    style={{ width: "100%" }}
                  />
                  <div className="invalid-feedback">
                    {validationErrors.album}
                  </div>
                  <br />
                  Description:
                  <br />
                  <input
                    className={`mb-3 ${
                      validationErrors.description ? "is-invalid" : ""
                    }`}
                    type="text"
                    id="dec"
                    name="description"
                    ref={dec}
                    onChange={handleInputChange}
                    value={view.description}
                    style={{ width: "100%" }}
                  />
                  <div className="invalid-feedback">
                    {validationErrors.description}
                  </div>
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
              {Package?.map((val, ind) => (
                <div className="col-xs-12 col-sm-6 col-md-4" key={ind}>
                        <ScrollAnimation animateIn="zoomIn">

                  <div className="card">
                    <div className="card-body package-body" style={{height:"400px"}}>
                      <span className="blog-item-label">Package</span>
                      <h3 style={{marginTop: "10px", fontWeight: "700"}}>{val.title}</h3>
                      <h5 style={{marginTop: "10px", fontWeight: "700", color: "var(--secondary-text-color)"}}>Price : <span>₹ {val.price}</span> /-</h5>
                      <div className="package-list">
                        <li>{val.fild}</li>
                        <li>{val.type}</li>
                        <li>{val.hours}</li>
                        <li>{val.member}</li>
                        <li>{val.album}</li>
                        <li>{val.description}</li>
                      </div>
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

export default Package;
