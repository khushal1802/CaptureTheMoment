import React from 'react'
import '../CSS/user.css'
// import profilePicture from '../Images/photographer_1.jpg'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import MySwal from "sweetalert2";
import ScrollAnimation from "react-animate-on-scroll";


function Profile() {
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
            window.location = "/";
          }
        });
      };
    return (
        <ScrollAnimation animateIn="zoomIn">
        <div className='profile-section'>
            <div className="profile-card">
                <div className="profile-user-image">
                    <img src={Cookies.get("Profile")} alt="profilePicture" />
                </div>
                <div className="profile-user-information">
                    <div className="profile-info">
                        <div className="user-info">
                            <i className="ri-user-3-line"></i>
                            <p>{Cookies.get("Name")}</p>
                        </div>
                        <div className="user-info">
                            <i className="ri-mail-line"></i>
                            <p>{Cookies.get("Email")}</p>
                        </div>
                        <div className="user-info">
                            <i className="ri-phone-line"></i>
                            <p>+91&nbsp;{Cookies.get("Phone")}</p>
                        </div>
                        <div className="user-info">
                            <i className="ri-map-pin-line"></i>
                            <p>{Cookies.get("Address")}</p>
                        </div>
                    </div>
                </div>
                <div className="profile-operation">
                    <Link to={"/"} type="button" className='profile-operation-link btnLogout' onClick={handleLogOut}>Logout</Link>
                </div>
            </div>
            
        </div>
        </ScrollAnimation>
    )
}

export default Profile