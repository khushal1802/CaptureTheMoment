import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../admin.css";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Logo from '../../Atoms/Logo'

function Sidebar({ data }) {
  // Sidebar Toggler
  const handleSidebarToggle = () => {
    const sidebar = document.querySelector(".sidebar");
    const content = document.querySelector(".content");
    sidebar.classList.toggle("open");
    content.classList.toggle("open");
  };
  const handleLogOut = () => {
    Swal.fire({
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
        window.location = "/";
      }
    });
  };

  return (
    <div className="admin-all-navbar">
      {/* Sidebar Start */}
      <div className="sidebar">
        <nav className="navbar navbar-dark">
          <div className="admin-profile-info">
            <div className="profile-image">
              <img
                className="rounded-circle"
                src={Cookies.get("Profile")}
                alt=""
              />
            </div>
            <div className="admin-info">
              <h6 className="admin-name">{Cookies.get("Name")}</h6>
              <span>Admin</span>
            </div>
          </div>
          <div className="navbar-nav w-100 admin-operation-nav">
            {data?.map((val, ind) => {
              return (
                <li className="navbar-items" key={ind}>
                  <NavLink
                    to={val.path}
                    className={({isActive}) => `nav-item ${isActive? "navLinkActive":""}`}
                    data-link-alt={val.name}
                  >
                    {val.icon && <span className="icon">{val.icon}</span>}
                    <span>{val.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Sidebar End */}

      {/* Navbar Start */}
      <nav
        className="navbar navbar-expand sticky-top admin-top-navbar"
      >
        {/* left */}
        <div className="left-nav">
          <Link
            href="#"
            className="sidebar-toggler flex-shrink-0 menu"
            onClick={handleSidebarToggle}
            style={{color: "white", textDecoration: "none"}}
          >
            <i className="ri-menu-5-line"></i>
          </Link>
          <Link href="index.html" className="navbar-brand admin-logo">
            <Logo />
          </Link>
          <Link href="index.html" className="navbar-brand d-flex d-lg-none me-4">
            <h2 className="text-primary mb-0">
              <i className="fa fa-user-edit"></i>
            </h2>
          </Link>
        </div>

        {/* right */}
        <div className="right-nav">
          <div className="nav-item dropdown">
            <Link
              href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                className="rounded-circle me-lg-2"
                src={Cookies.get("Profile")}
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
              <span className="d-none d-lg-inline-flex">
                {Cookies.get("Name")}
              </span>
            </Link>
            <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
              <Link to={'/userProfile'} className="dropdown-item">
                My Profile
              </Link>
              <Link href="#" className="dropdown-item" onClick={handleLogOut}>
                Log Out
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Navbar End */}
    </div>
  );
}

export default Sidebar;
