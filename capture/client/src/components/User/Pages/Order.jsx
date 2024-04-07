import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";

function Order() {
  const [orderData, setorderData] = useState();
  const orderId = Cookies.get("orderId");

  useEffect(() => {
    axios.get("http://localhost:5000/v1/order/list").then((res) => {
      setorderData(res.data.data);
    });
  }, []);

  const filterORDER = orderData?.filter((val) => orderId === val._id);

  if (orderId === undefined || orderId === "") {
    return (
      <ScrollAnimation animateIn="zoomIn">
      <div className="order-package-info">
        <div className="order-info">
          <h3 style={{textAlign:"center"}}>Opps !😞: your not ordered !</h3>
          <div style={{ paddingTop: "10px" }}>
            <Link to={"/"} className="goHomePageBtn">
              Go to Home Page
            </Link>
          </div>
        </div>
      </div>
      </ScrollAnimation>
    );
  } else {
    return filterORDER?.map((val, ind) => {
      return (
        <ScrollAnimation animateIn="zoomIn">
        <div className="order-package-info" key={ind}>
          <div className="order-info">
            <div className="order-title">
              <h3>Your Booked Package Information</h3>
            </div>
            <div className="client-order-info">
              <i className="ri-user-3-line"></i>
              <p>{val.name}</p>
            </div>
            <div className="client-order-info">
              <i className="ri-mail-line"></i>
              <p>{val.email}</p>
            </div>
            <div className="client-order-info">
              <i className="ri-calendar-line"></i>
              <p>{new Date(val.date).toLocaleDateString("en-US")}</p>
            </div>
            <div className="client-order-info">
              <i className="ri-map-pin-line"></i>
              <p>{val.address}</p>
            </div>
            <div className="client-order-info">
              <i className="ri-price-tag-3-line"></i>
              <p>$ {val.price}/-</p>
            </div>
            <div className="client-order-info">
              <i className="ri-article-line"></i>
              <p>{val.title}</p>
            </div>

            <div style={{ paddingTop: "10px" }}>
              <Link to={"/"} className="goHomePageBtn">
                Goto Home Page
              </Link>
            </div>
          </div>
        </div>
        </ScrollAnimation>
      );
    });
  }
}

export default Order;
