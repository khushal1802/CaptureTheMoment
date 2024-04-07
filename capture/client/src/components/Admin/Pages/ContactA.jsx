import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  DELETE_CONTACT_PROGRESS,
  GET_CONTACT_PROGRESS,
  POST_CONTACT_PROGRESS,
  UPDATE_CONTACT_PROGRESS,
} from "../../../redux-saga/Admin/contact/contactAction";
import "react-toastify/dist/ReactToastify.css";
import { LoaderContext } from "../../../LoaderContext";
import ScrollAnimation from "react-animate-on-scroll";

function ContactA() {
  const [Search, setSearch] = useState("");

  const { setloader } = React.useContext(LoaderContext)
  const fname = useRef();
  const lname = useRef();
  const email = useRef();
  const phone = useRef();
  const dec = useRef();
  const [view, setView] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    description: "",
  });
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [validationErrors, setValidationErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    description: "",
  });

  const Contact = useSelector((state) => state.contactReducer.contact);
  const dispatch = useDispatch();

  useEffect(() => {
    setloader(true)
    dispatch({ type: GET_CONTACT_PROGRESS });
    setTimeout(() => { setloader(false) }, 1000)
  }, []);

  const validateForm = () => {
    const allowedDomains = ["com", "net", "org"];
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org)$/;

    const errors = {
      fname: fname.current.value.trim() === "" ? "First Name is required" : "",
      lname: lname.current.value.trim() === "" ? "Last Name is required" : "",
      email:
        email.current.value.trim() === ""
          ? "Email is required"
          : !emailRegex.test(email.current.value)
          ? "Please enter a valid email address with 'com', 'net', or 'org' domain"
          : "",
      phone:
        phone.current.value.trim() === "" ||
        !/^\d{10}$/.test(phone.current.value)
          ? "Please enter a valid 10-digit phone number"
          : "",
      description:
        dec.current.value.trim() === "" ? "Description is required" : "",
    };

    setValidationErrors(errors);

    return Object.values(errors).every((error) => error === "");
  };
  const handalSubmit = () => {
    if (validateForm()) {
      const data = {
        fname: fname.current.value,
        lname: lname.current.value,
        email: email.current.value,
        phone: phone.current.value,
        description: dec.current.value,
      };
      dispatch({
        type: POST_CONTACT_PROGRESS,
        payload: data,
      });

      toast.success("Contact added successfully", {
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
        fname: "",
        lname: "",
        email: "",
        phone: "",
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
      type: DELETE_CONTACT_PROGRESS,
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
      console.log(view);

      dispatch({
        type: UPDATE_CONTACT_PROGRESS,
        payload: view,
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Contact updated successfully", {
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
        fname: "",
        lname: "",
        email: "",
        phone: "",
        description: "",
      });
    }
  };

  return (
    <div style={{padding: "1.5vw 4vw"}}>
      <div className="admin-page-heading mb-4">
        <h2 style={{fontWeight: "700"}}>Client Contact Information</h2>
        <input 
          type="text" 
          placeholder="Search Contact Information" 
          onChange={(e)=>setSearch(e.target.value)}
          className="data-search-filed"
        />

        <button
          type="button"
          id="all-add-btn"
          className="d-none"
          data-bs-toggle="modal"
          data-bs-target="#myModal"
          onClick={() => setIsAdding(true)}
          >Add <i className="ri-add-line"></i>
        </button>
      </div>

      <section className="charts">
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
                  {isAdding ? "Create" : "Update"} Contact
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">
                <form>
                  First Name:
                  <br />
                  <input
                    className={`mb-3 ${
                      validationErrors.fname ? "is-invalid" : ""
                    }`}
                    type="text"
                    id="fname"
                    name="fname"
                    ref={fname}
                    onChange={handleInputChange}
                    value={view.fname}
                    style={{ width: "100%" }}
                  />
                  <div className="invalid-feedback">
                    {validationErrors.fname}
                  </div>
                  <br />
                  Last Name:
                  <br />
                  <input
                    className={`mb-3 fild ${
                      validationErrors.lname ? "is-invalid" : ""
                    }`}
                    type="text"
                    id="lname"
                    name="lname"
                    ref={lname}
                    onChange={handleInputChange}
                    value={view.lname}
                    style={{ width: "100%" }}
                  />
                  <div className="invalid-feedback">
                    {validationErrors.lname}
                  </div>
                  <br />
                  Email:
                  <br />
                  <input
                    className={`mb-3 fild ${
                      validationErrors.email ? "is-invalid" : ""
                    }`}
                    type="email"
                    id="email"
                    name="email"
                    ref={email}
                    onChange={handleInputChange}
                    value={view.email}
                    style={{ width: "100%" }}
                  />
                  <div className="invalid-feedback">
                    {validationErrors.email}
                  </div>
                  <br />
                  Phone:
                  <br />
                  <input
                    className={`mb-3 fild ${
                      validationErrors.phone ? "is-invalid" : ""
                    }`}
                    type="tel"
                    id="phone"
                    name="phone"
                    ref={phone}
                    onChange={handleInputChange}
                    value={view.phone}
                    style={{ width: "100%" }}
                  />
                  <div className="invalid-feedback">
                    {validationErrors.phone}
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
        <ScrollAnimation animateIn="zoomIn">
        <div className="row gy-4">
          <table>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Contact?.filter((item)=>{
                      return (Search.toLowerCase()=='' ? item : item.fname.toLowerCase().includes(Search.toLowerCase()) ||
                      Search.toLowerCase()=='' ? item : item.lname.toLowerCase().includes(Search.toLowerCase()))
                    })?.map((val, ind) => (
                <tr key={ind}>
                  <td>
                    {val.fname}&nbsp;{val.lname}
                  </td>
                  <td>{val.email}</td>
                  <td style={{textAlign: "center"}}>{val.phone}</td>
                  <td>{val.description}</td>
                  <td className="edit-info-btn">
                    <button
                      className="iconBtn"
                      onClick={() => handalDelete(val)}
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                    <button
                      className="iconBtn d-none"
                      style={{ marginLeft: "10px" }}
                      onClick={() => handleView(val)}
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                    >
                      <i className="ri-edit-2-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </ScrollAnimation>
      </section>
    </div>
  );
}

export default ContactA;
