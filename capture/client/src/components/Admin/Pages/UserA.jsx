import React, { useEffect, useState } from "react";
import "../admin.css";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_USER_PROGRESS,
  GET_USER_PROGRESS,
  POST_USER_PROGRESS,
  UPDATE_USER_PROGRESS,
} from "../../../redux-saga/Admin/user/userAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoaderContext } from "../../../LoaderContext";
import ScrollAnimation from "react-animate-on-scroll";

function UserA() {
  const { setloader } = React.useContext(LoaderContext);
  const [Search, setSearch] = useState("");
  const [view, setView] = useState({
    Name: "",
    Profile: "",
    Password: "",
    DOB: "",
    Phone: "",
    Email: "",
    Address: "",
  });

  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});

  const User = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setloader(true);
    dispatch({ type: GET_USER_PROGRESS });
    setTimeout(() => {
      setloader(false);
    }, 1000);
  }, []);

  const handleAddUser = () => {
    if (validateForm()) {
      const formData = new FormData();
      formData.append("Password", view.Password);
      formData.append("Name", view.Name);
      formData.append("DOB", view.DOB);
      formData.append("Address", view.Address);
      formData.append("Phone", view.Phone);
      formData.append("Email", view.Email);
      formData.append("Profile", view.Profile);

      dispatch({
        type: POST_USER_PROGRESS,
        payload: formData,
      });

      toast.success("User added successfully");
      clear();
    } else {
      toast.error("Please fix the validation errors");
    }
  };

  const handleUpdateUser = () => {
    if (validateForm()) {
      const formData = new FormData();
      formData.append("Password", view.Password);
      formData.append("Name", view.Name);
      formData.append("DOB", view.DOB);
      formData.append("Address", view.Address);
      formData.append("Phone", view.Phone);
      formData.append("Email", view.Email);
      formData.append("Profile", view.Profile);

      dispatch({
        type: UPDATE_USER_PROGRESS,
        payload: { view, formData },
      });

      toast.success("User updated successfully");
      clear();
    } else {
      toast.error("Please fix the validation errors");
    }
  };

  const clear = () => {
    setView({
      Name: "",
      Profile: "",
      Password: "",
      DOB: "",
      Phone: "",
      Email: "",
      Address: "",
    });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org)$/;
    const phoneRegex = /^\d{10}$/;

    const errors = {
      Name: view.Name.trim() === "" ? "User Name is required" : "",
      Profile: view.Profile ? "" : "Profile is required",
      Password: view.Password.trim() === "" ? "Password is required" : "",
      DOB: view.DOB.trim() === "" ? "Date of Birth is required" : "",
      Phone:
        view.Phone === "" || !phoneRegex.test(view.Phone)
          ? "Please enter a valid 10-digit phone number"
          : "",
      Email:
        view.Email.trim() === "" || !emailRegex.test(view.Email)
          ? "Please enter a valid email address with 'com', 'net', or 'org' domain"
          : "",
      Address: view.Address.trim() === "" ? "Address is required" : "",
    };

    setValidationErrors(errors);

    return Object.values(errors).every((error) => error === "");
  };

  const handalDelete = (val) => {
    toast.success("User deleted successfully");
    dispatch({
      type: DELETE_USER_PROGRESS,
      payload: val,
    });
  };

  const handleViewUser = (val) => {
    const formattedDate = val.RegisterDate
      ? new Date(val.RegisterDate).toISOString().split("T")[0]
      : "";
    setView({
      ...val,
      RegisterDate: formattedDate,
    });
    setIsAdding(false);
  };

  const handleInputChange = (e) => {
    setView((view) => ({
      ...view,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setView((prevView) => ({
      ...prevView,
      Profile: e.target.files[0],
    }));
  };

  return (
    <>
      <div>
        <div style={{ padding: "1.5vw 3vw" }}>
          <ScrollAnimation animateIn="slideInDown">
            <div className="admin-page-heading">
              <h2 style={{ fontWeight: "700" }}>User Information</h2>
              <input
                type="text"
                placeholder="Search User Information"
                onChange={(e) => setSearch(e.target.value)}
                className="data-search-filed"
              />
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
                      {isAdding ? "Create" : "Update"} User
                    </h4>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                    ></button>
                  </div>

                  <div className="modal-body">
                    <form encType="multipart/form-data">
                      User Name:
                      <br />
                      <input
                        className={`mb-3 fild ${
                          validationErrors.Name ? "is-invalid" : ""
                        }`}
                        type="text"
                        id="name"
                        name="Name"
                        onChange={handleInputChange}
                        value={view.Name}
                        style={{ width: "100%" }}
                      />
                      <div className="invalid-feedback">
                        {validationErrors.Name}
                      </div>
                      <br />
                      Profile:
                      <br />
                      <input
                        className={`mb-3 fild ${
                          validationErrors.Profile ? "is-invalid" : ""
                        }`}
                        type="file"
                        id="img"
                        name="img"
                        onChange={handleFileChange}
                        style={{ width: "100%" }}
                      />
                      <div className="invalid-feedback">
                        {validationErrors.Profile}
                      </div>
                      <br />
                      Password:
                      <br />
                      <input
                        className={`mb-3 fild ${
                          validationErrors.Password ? "is-invalid" : ""
                        }`}
                        type="password"
                        id="password"
                        name="Password"
                        onChange={handleInputChange}
                        value={view.Password}
                        style={{ width: "100%" }}
                      />
                      <div className="invalid-feedback">
                        {validationErrors.Password}
                      </div>
                      <br />
                      DOB:
                      <br />
                      <input
                        className={`mb-3 fild ${
                          validationErrors.DOB ? "is-invalid" : ""
                        }`}
                        type="date"
                        id="dob"
                        name="DOB"
                        onChange={handleInputChange}
                        value={view.DOB}
                        style={{ width: "100%" }}
                      />
                      <div className="invalid-feedback">
                        {validationErrors.DOB}
                      </div>
                      <br />
                      Phone:
                      <br />
                      <input
                        className={`mb-3 fild ${
                          validationErrors.Phone ? "is-invalid" : ""
                        }`}
                        type="tel"
                        id="phone"
                        name="Phone"
                        onChange={handleInputChange}
                        value={view.Phone}
                        style={{ width: "100%" }}
                      />
                      <div className="invalid-feedback">
                        {validationErrors.Phone}
                      </div>
                      <br />
                      Email:
                      <br />
                      <input
                        className={`mb-3 fild ${
                          validationErrors.Email ? "is-invalid" : ""
                        }`}
                        type="email"
                        id="email"
                        name="Email"
                        onChange={handleInputChange}
                        value={view.Email}
                        style={{ width: "100%" }}
                      />
                      <div className="invalid-feedback">
                        {validationErrors.Email}
                      </div>
                      <br />
                      Address:
                      <textarea
                        className={`mb-3 fild ${
                          validationErrors.Address ? "is-invalid" : ""
                        }`}
                        type="text"
                        id="address"
                        name="Address"
                        onChange={handleInputChange}
                        value={view.Address}
                        style={{ width: "100%" }}
                      ></textarea>
                      <div className="invalid-feedback">
                        {validationErrors.Address}
                      </div>
                    </form>
                  </div>

                  <div className="modal-footer">
                    {isAdding ? (
                      <input
                        type="button"
                        className="main m-2"
                        value="Submit"
                        onClick={handleAddUser}
                      />
                    ) : (
                      <input
                        type="button"
                        className="main m-2"
                        value="Update"
                        onClick={handleUpdateUser}
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
            <div className="row">
              <table>
                <thead>
                  <tr>
                    <th scope="col">User Name</th>
                    <th scope="col">Profile</th>
                    <th scope="col">DOB</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {User?.filter((item) => {
                    return Search.toLowerCase() == ""
                      ? item
                      : item.Name.toLowerCase().includes(
                          Search.toLowerCase()
                        ) || Search.toLowerCase() == ""
                      ? item
                      : item.Email.toLowerCase().includes(Search.toLowerCase());
                  })?.map((val, ind) => (
                    <tr key={ind}>
                      <td>{val.Name}</td>
                      <td>
                        {val.Profile && (
                          <img
                            src={val.Profile}
                            alt="profile"
                            style={{
                              display: "block",
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              margin: "0 auto",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {new Date(val.DOB).toLocaleDateString("en-US")}
                      </td>
                      <td style={{ textAlign: "center" }}>{val.Phone}</td>
                      <td>{val.Email}</td>
                      <td>{val.Address}</td>
                      <td className="edit-info-btn">
                        <button
                          className="iconBtn"
                          style={{ margin: "0px" }}
                          onClick={() => handalDelete(val)}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                        <button
                          className="iconBtn"
                          style={{ marginLeft: "10px" }}
                          onClick={() => handleViewUser(val)}
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
      </div>
    </>
  );
}

export default UserA;
