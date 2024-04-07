import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import logo from "../Images/logo.png";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import Cursor from "../../User/Pages/Cursor";
import Logo from "../Logo";
import { LoaderContext } from "../../../LoaderContext";
// import userPicture from '../../User/Images/photographer_1.jpg'

const Navbar = ({ data }) => {
  const {setDarkMode} = React.useContext(LoaderContext)
  const {darkMode} = React.useContext(LoaderContext)

  const [userMode, setUserMode] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  console.log(data, "data");
  const MySwal = withReactContent(Swal);

  const handleLogOut = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "No, cancel",
      background: "#262626",
      color: "#ffffff",
      iconColor: "#f52225",
      confirmButtonColor: "#f52225",
      cancelButtonColor: "#171717",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("Role");
        Cookies.remove("Name");
        Cookies.remove("_id");
        Cookies.remove("Profile");
        Cookies.remove("Address");
        Cookies.remove("Email");
        Cookies.remove("Phone");        
        window.location = "/";
      }
    });
  };
  return (
    <>
      <Cursor />
      <header className="user-navbar">
        <nav className="navbar navbar-expand-lg">
          {/* (1) */}
          <div>
            <Link to={"/"} className="open-link">
              <Logo />
            </Link>
          </div>

          {/* (2) */}
          <button
            className="toggleBtn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* <span
              className="navbar-toggler-icon"
            ></span> */}
            <input type="checkbox" id="checkbox" />
            <label htmlFor="checkbox" className="toggle">
              <div className="bars" id="bar1"></div>
              <div className="bars" id="bar2"></div>
              <div className="bars" id="bar3"></div>
            </label>
          </button>

          {/* (3) */}
          <div
            className="collapse navbar-collapse justify-content-end navbar-lists"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mr-auto">
              {data?.map((val, ind) => {
                return (
                  <li className="nav-item active" key={ind}>
                    <NavLink
                      to={val.path}
                      className={({isActive}) => `nav-link ${isActive? 'userNavLinkActive':""}`}
                      data-link-alt={val.name}
                    >
                      <span>{val.name}</span>
                    </NavLink>
                  </li>
                );
              })}
               
              <li className="nav-item dropdown user-dropdown">
                <div className="nav-link dropdown-toggle user-dropdown-toogle" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  Profile 
                </div>
                <div className="dropdown-menu user-dropdown-menu" aria-labelledby="navbarDropdown">
                  <div className="dropdown-item user-dropdown-item user-profile-info">
                    <img src={Cookies.get("Profile")} alt="Profile" className="userPicture" style={{width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover"}}/>
                    <div>
                      <p style={{fontWeight: "700"}}>{Cookies.get("Name")}</p>
                      <p style={{fontSize:"12px",fontWeight: "600", color: "var(--secondary-text-color)"}}>{Cookies.get("Email")}</p>
                    </div>
                  </div>
                  <Link to={"/userProfile"} className="dropdown-item user-dropdown-item">
                    <i className="ri-user-3-line"></i>
                    <span>Profile</span>
                  </Link>
                  <Link to={"/booking"} className="dropdown-item user-dropdown-item">
                    <i className="ri-pages-line"></i>
                    <span>Your Booking</span>
                  </Link>
                  <Link className="dropdown-item user-dropdown-item" onClick={handleLogOut}>
                    <i className="ri-logout-box-line"></i>
                    <span>Logout</span>
                  </Link>
                  <div style={{width: "100%", display: "flex", alignItems: "center", padding: "14px 24px 0px 24px", marginBottom: "14px", gap: "10px", borderTop: "1px solid var(--secondary-text-color)"}}>
                    <p style={{margin: "0", fontWeight: "600", color: "var(--primary-text-color)", fontSize: " 15px"}}>{userMode? "Dark Mode": "Light Mode"}</p>
                    <label className="switch">
                      <input 
                        type="checkbox"  
                        onChange={toggleDarkMode} 
                        checked={darkMode} 
                        onClick={ () => setUserMode(!userMode) }/>
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </li>
              {/* <label className="switch">
                <input type="checkbox" onChange={toggleDarkMode} checked={darkMode} />
                <span className="slider round"></span>
              </label> */}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;