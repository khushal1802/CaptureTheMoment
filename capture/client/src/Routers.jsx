import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import { userNav } from "./components/User/Header/userNav";
import Navbar from "./components/Atoms/Header/Navbar";
import Cookies from "js-cookie";
import Home from "./components/User/Pages/Home";
import About from "./components/User/Pages/About";
import Blog from "./components/User/Pages/Blog";
import Films from "./components/User/Pages/Films";
import Contact from "./components/User/Pages/Contact";
import Photography from "./components/User/Pages/Photography";
import Sidebar from "./components/Admin/Pages/sidebar";
import { adminNav } from "./components/Admin/Header/adminNav";
import Dashbord from "./components/Admin/Pages/Dashbord";
import UserA from "./components/Admin/Pages/UserA";
import PhotoA from "./components/Admin/Pages/PhotoA";
import VideoA from "./components/Admin/Pages/VideoA";
import BlogA from "./components/Admin/Pages/BlogA";
import TeamA from "./components/Admin/Pages/TeamA";
import PressA from "./components/Admin/Pages/PressA";
import CommentA from "./components/Admin/Pages/CommentA";
import ContactA from "./components/Admin/Pages/ContactA";
import Package from "./components/Admin/Pages/Package";
import { ToastContainer } from "react-toastify";
import Press from "./components/User/Pages/Press";
import Signup from "./components/User/Pages/Signup";
import AddCommentForm from "./components/Atoms/AddCommentForm";
import AddBlogForm from "./components/Atoms/AddBlogForm";
import Profile from "./components/User/Pages/Profile";
import UserPackage from "./components/User/Pages/UserPackage";
import { LoaderContext } from "./LoaderContext";
import { Circles, FallingLines, Puff } from "react-loader-spinner";
import PageNotFound from "./components/User/Pages/PageNotFound";
import CheckoutForm from "./components/User/Pages/CheckoutForm";
import Order from "./components/User/Pages/Order";
import OrderA from "./components/Admin/Pages/OrderA";

function Routers() {
  const { loader } = React.useContext(LoaderContext);
  const { darkMode } = React.useContext(LoaderContext);

  const loaderStyles = {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(13, 13, 13, 0.5)",
    backdropFilter: "blur(10px)",
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 999999999,
  };

  const role = Cookies.get("Role");

  // const role = "admin";
  // const role = "user";

  if (!role || role === "") {
    return (
      <>
        <div
          className={`app ${darkMode ? "dark-mode" : "light-mode"}`}
        >
          <Routes>
            <Route path="/registration" element={<Signup />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/*" element={<UserLogin />} />
            <Route path="/adminlogin" element={<UserLogin />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        {loader && (
          <div style={loaderStyles}>
            <Circles color="#f52225" />
          </div>
        )}
        <ToastContainer />
      </>
    );
  } else if (role === "admin") {
    return (
      <>
        <div
          className={`admin-app app ${darkMode ? "dark-mode" : "light-mode"}`}
        >
          <div className="content ">
            <Sidebar data={adminNav} />
            <Routes>
              <Route path="/" exact element={<Dashbord />}></Route>
              <Route path="/user" exact element={<UserA />}></Route>
              <Route path="/photo" exact element={<PhotoA />}></Route>
              <Route path="/video" exact element={<VideoA />}></Route>
              <Route path="/blog" exact element={<BlogA />}></Route>
              <Route path="/team" exact element={<TeamA />}></Route>
              <Route path="/press" exact element={<PressA />}></Route>
              <Route path="/comment" exact element={<CommentA />}></Route>
              <Route path="/contact" exact element={<ContactA />}></Route>
              <Route path="/userProfile" element={<Profile />}></Route>
              <Route path="/booking" element={<OrderA />}></Route>
              <Route path="/package" exact element={<Package />}></Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
        {loader && (
          <div style={loaderStyles}>
            <FallingLines
              color="#f52225"
              width="100"
              visible={true}
              ariaLabel="falling-circles-loading"
            />
          </div>
        )}
      </>
    );
  } else if (role === "user") {
    return (
      <>
        <div
          className={`user-app app ${darkMode ? "dark-mode" : "light-mode"}`}
        >
          <Navbar data={userNav} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/films" element={<Films />} />
            <Route path="/press" element={<Press />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/Userpackage" element={<UserPackage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/addcomment" element={<AddCommentForm />} />
            <Route path="/addblog" element={<AddBlogForm />} />
            <Route path="/userProfile" element={<Profile />} />
            <Route path="/booking" element={<Order />} />
            <Route path="/CheckoutForm" element={<CheckoutForm />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <ToastContainer />
        </div>
        {loader && (
          <div style={loaderStyles}>
            <Puff
              visible={true}
              height="80"
              width="80"
              color="#f52225"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperclassName=""
            />
          </div>
        )}
      </>
    );
  }
}

export default Routers;
