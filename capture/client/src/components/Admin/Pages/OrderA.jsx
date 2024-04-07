import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  DELETE_ORDER_PROGRESS,
  GET_ORDER_PROGRESS,
  POST_ORDER_PROGRESS,
  UPDATE_ORDER_PROGRESS,
} from "../../../redux-saga/Admin/order/orderAction";
import "react-toastify/dist/ReactToastify.css";
import { LoaderContext } from "../../../LoaderContext";
import ScrollAnimation from "react-animate-on-scroll";

function OrderA() {
  const { setloader } = React.useContext(LoaderContext);
  const name = useRef();
  const email = useRef();
  const date = useRef();
  const address = useRef();
  const price = useRef();
  const title = useRef();
  const [view, setView] = useState({
    name: "",
    email: "",
    date: "",
    address: "",
    price: "",
    title: "",
  });
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    date: "",
    address: "",
    price: "",
    title: "",
  });

  const Order = useSelector((state) => state.orderReducer.order);
  const dispatch = useDispatch();
  console.log(Order);

  useEffect(() => {
    setloader(true);
    dispatch({ type: GET_ORDER_PROGRESS });
    setTimeout(() => {
      setloader(false);
    }, 1000);
  }, []);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org)$/;
    const currentDate = new Date();
    const enteredDate = new Date(date.current.value);
  
    const errors = {
      name: name.current.value.trim() === "" ? "Name is required" : "",
      date: date.current.value.trim() === "" ? "Date is required" : 
        enteredDate <= currentDate ? "Please select a future date" : "",
      email: email.current.value.trim() === "" ? "Email is required" : 
        !emailRegex.test(email.current.value) ? 
          "Please enter a valid email address with 'com', 'net', or 'org' domain" : "",
      address: address.current.value.trim() === "" ? "Address is required" : "",
      price: price.current.value.trim() === "" ? "Price is required" : "",
      title: title.current.value.trim() === "" ? "Title is required" : "",
    };
  
    setValidationErrors(errors);
  
    return Object.values(errors).every((error) => error === "");
  };
  const handalSubmit = () => {
    if (validateForm()) {
      const data = {
        name: name.current.value,
        email: email.current.value,
        date: date.current.value,
        address: address.current.value,
        price: price.current.value,
        title: title.current.value,
      };
      console.log(data);
      dispatch({
        type: POST_ORDER_PROGRESS,
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
        name: "",
        email: "",
        date: "",
        address: "",
        price: "",
        title: "",
      });
    }
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
      type: DELETE_ORDER_PROGRESS,
      payload: val,
    });
  };

  const handleUpdate = () => {
    if (validateForm()) {
      console.log(view);

      dispatch({
        type: UPDATE_ORDER_PROGRESS,
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
        name: "",
        email: "",
        date: "",
        address: "",
        price: "",
        title: "",
      });
    }
  };

  return (
    <div style={{ padding: "1.5vw 4vw" }}>
                <ScrollAnimation animateIn="slideInDown">

      <div className="admin-page-heading">
        <h2 style={{ fontWeight: "700" }}>Package Booking Information</h2>
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
                  {isAdding ? "Create" : "Update"} Booking
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
                    className={`mb-3 ${
                      validationErrors.name ? "is-invalid" : ""
                    }`}
                    type="text"
                    id="name"
                    name="name"
                    ref={name}
                    onChange={handleInputChange}
                    value={view.name}
                    style={{ width: "100%" }}
                  />
                  <div className="invalid-feedback">
                    {validationErrors.name}
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
                  Date:
                  <br />
                  <input
                    className={`mb-3 fild ${
                      validationErrors.date ? "is-invalid" : ""
                    }`}
                    type="date"
                    id="date"
                    name="date"
                    ref={date}
                    onChange={handleInputChange}
                    value={view.date}
                    style={{ width: "100%" }}
                  />
                  <div className="invalid-feedback">
                    {validationErrors.date}
                  </div>
                  <br />
                  Address:
                  <br />
                  <input
                    className={`mb-3 fild ${
                      validationErrors.address ? "is-invalid" : ""
                    }`}
                    type="text"
                    id="address"
                    name="address"
                    ref={address}
                    onChange={handleInputChange}
                    value={view.address}
                    style={{ width: "100%" }}
                  />
                  <div className="invalid-feedback">
                    {validationErrors.address}
                  </div>
                  <br />
                  Price:
                  <br />
                  <input
                    className={`mb-3 ${
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
                  Title:
                  <br />
                  <input
                    className={`mb-3 ${
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
                <th scope="col">Date</th>
                <th scope="col">Address</th>
                <th scope="col">Price</th>
                <th scope="col">Title</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Order?.map((val, ind) => (
                <tr key={ind}>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td style={{ textAlign: "center" }}>{new Date(val.date).toLocaleDateString("en-US")}</td>
                  <td>{val.address}</td>
                  <td>{val.price}</td>
                  <td>{val.title}</td>

                  <td className="edit-info-btn">
                    <button
                      className="iconBtn"
                      onClick={() => handalDelete(val)}
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                    <button
                      className="iconBtn"
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

export default OrderA;
