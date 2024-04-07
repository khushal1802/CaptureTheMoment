import React, { useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BASE_URL, USER_LOGIN } from "../redux-saga/constant";

import Logo from "./Atoms/Logo";
import FormBackground from "./Atoms/FormBackground";
import { LoaderContext } from "../LoaderContext";
import ScrollAnimation from 'react-animate-on-scroll';

const UserLogin = () => {
  const { setloader } = React.useContext(LoaderContext);

  const MySwal = withReactContent(Swal);

  const email = useRef();
  const password = useRef();

  const handleLogin = () => {
    setloader(true);
    const data = {
      Email: email.current.value,
      Password: password.current.value,
    };

    console.log(data);
    axios
      .post("http://localhost:5000/v1/auth/login", data)
      .then((res) => {
        console.log(res);
        console.log(data);
        Cookies.set("Role", res.data.data.Role);
        Cookies.set("_id", res.data.data._id);
        Cookies.set("Name", res.data.data.Name);
        Cookies.set("Profile", res.data.data.Profile);
        Cookies.set("Email", res.data.data.Email);
        Cookies.set("Phone", res.data.data.Phone);
        Cookies.set("Address", res.data.data.Address);

        Swal.fire({
          title: "Login Succsessfuly!",
          text: "You clicked the button!",
          icon: "success",
          background: "#262626",
          color: "#ffffff",
          iconColor: "#f52225",
          confirmButtonColor: "#f52225",
          cancelButtonColor: "#171717",
        });
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
        MySwal.fire({
          title: "Your Information Is Not Valid !",
          icon: "info",
          showCancelButton: false,
          confirmButtonText: "OK",
          background: "#262626",
          color: "#ffffff",
          iconColor: "#f52225",
          confirmButtonColor: "#f52225",
          cancelButtonColor: "#171717",
        }).then((result) => {
          if (result.isConfirmed) {
            // window.location = "/";
          }
        });
      })
      .finally((_) => setloader(false));
  };

  return (
    <div className="login-form-section">
      {/* ---------- login-left-section ---------- */}
      <div className="login-left-section">
        <div className="login-nav">
          <Logo />
        </div>

        {/* ---------- Login-section ---------- */}
        <ScrollAnimation animateIn="slideInLeft">
        <div className="login-section">
          <div className="login">
            {/* ---------- login-heading ---------- */}
            <div className="login-heading">
              <h2>Welcome Back</h2>
              <p>Welcome back! Please Enter your details.</p>
            </div>

            {/* ---------- login-form ---------- */}
            <div className="login-form">
              {/* <form action="">
              </form> */}
              <div className="form">
                <input
                  type="email"
                  ref={email}
                  placeholder="Email"
                  autoComplete="off"
                />
              </div>
              <div className="form">
                <input
                  type="password"
                  ref={password}
                  placeholder="Password"
                  autoComplete="off"
                />
              </div>
              <div className="form">
                <button onClick={handleLogin} className="loginBtn">
                  Login
                </button>
              </div>
            </div>

            {/* ---------- login-footer ---------- */}
            <div className="login-footer">
              <p className="question">
                Don't have an account?{" "}
                <Link to={"/registration"} className="link-tag">
                  Sign up for free
                </Link>
              </p>
              <Link
                to={"/adminlogin"}
                className="link-tag"
                style={{ fontWeight: "600" }}
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </ScrollAnimation>
      </div>

      {/* ---------- login-right-section ---------- */}
      <div className="login-right-section">
        <FormBackground />
      </div>
    </div>
  );
};

export default UserLogin;
