import React, { useEffect } from "react";
import CountUp from "react-countup";
import Barc from "./Barc";
import Graphs from "./Graphs";
import ScrollAnimation from "react-animate-on-scroll";

function Dashbord() {
  return (
    <div style={{ padding: "1vw 3vw" }}>
      <ScrollAnimation animateIn="slideInDown">
        <h1 style={{ fontWeight: "700" }}>Dashboard</h1>
        <p style={{ color: "var(--secondary-text-color)" }}>
          Welcome to the dashboard! Here you can view and manage your account
          information, as well as access important application functionalities.
        </p>
        <hr />
      </ScrollAnimation>
      <div className="admin-data">
        <ScrollAnimation animateIn="zoomIn">
          <div className="user-info-card">
            <i
              className="ri-user-3-line"
              style={{
                fontSize: "46px",
                backgroundColor: "rgba(245, 34, 37, 0.25)",
                padding: "12px",
                borderRadius: "14px",
              }}
            ></i>
            <div>
              <h3
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  marginTop: "20px",
                  marginBottom: "4px",
                }}
              >
                Total Number of User
                <CountUp
                  start={0}
                  end={45214625}
                  duration={2.75}
                  separator=" "
                  decimal=","
                  className="countUp"
                />
              </h3>
            </div>
          </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn="zoomIn">
          <div className="user-info-card">
            <i
              className="fa fa-university"
              style={{
                fontSize: "46px",
                backgroundColor: "rgba(245, 34, 37, 0.25)",
                padding: "12px",
                borderRadius: "14px",
              }}
            ></i>
            <div>
              <h3
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  marginTop: "20px",
                  marginBottom: "4px",
                }}
              >
                Total Payment
                <CountUp
                  start={0}
                  end={726920.53}
                  duration={2.75}
                  separator=" "
                  decimals={2}
                  prefix="₹ "
                  decimal="."
                  className="countUp"
                />
              </h3>
            </div>
          </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn="zoomIn">
          <div className="user-info-card">
            <i
              className="ri-article-line"
              style={{
                fontSize: "46px",
                backgroundColor: "rgba(245, 34, 37, 0.25)",
                padding: "12px",
                borderRadius: "14px",
              }}
            ></i>
            <div>
              <h3
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  marginTop: "20px",
                  marginBottom: "4px",
                }}
              >
                Total Number of Order
                <CountUp
                  start={0}
                  end={1205709}
                  duration={2.75}
                  separator=" "
                  decimal=","
                  className="countUp"
                />
              </h3>
            </div>
          </div>
        </ScrollAnimation>
      </div>

      <div className="admin-data">
        <ScrollAnimation animateIn="zoomIn">
          <div className="user-info-card">
            <i
              className="fa fa-users"
              style={{
                fontSize: "46px",
                backgroundColor: "rgba(245, 34, 37, 0.25)",
                padding: "12px",
                borderRadius: "14px",
              }}
            ></i>
            <div>
              <h3
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  marginTop: "20px",
                  marginBottom: "4px",
                }}
              >
                Total Number of Team
                <CountUp
                  start={94613702}
                  end={87}
                  duration={2.75}
                  separator=" "
                  decimal=","
                  className="countUp"
                />
              </h3>
            </div>
          </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn="zoomIn">
          <div className="user-info-card">
            <i
              className="far fa-image"
              style={{
                fontSize: "46px",
                backgroundColor: "rgba(245, 34, 37, 0.25)",
                padding: "12px",
                borderRadius: "14px",
              }}
            ></i>
            <div>
              <h3
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  marginTop: "20px",
                  marginBottom: "4px",
                }}
              >
                Total Number of Images
                <CountUp
                  start={0}
                  end={160527012}
                  duration={2.75}
                  separator=" "
                  decimal=","
                  className="countUp"
                />
              </h3>
            </div>
          </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn="zoomIn">
          <div className="user-info-card">
            <i
              className="fas fa-video"
              style={{
                fontSize: "46px",
                backgroundColor: "rgba(245, 34, 37, 0.25)",
                padding: "12px",
                borderRadius: "14px",
              }}
            ></i>
            <div>
              <h3
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  marginTop: "20px",
                  marginBottom: "4px",
                }}
              >
                Total Number of Video
                <CountUp
                  start={0}
                  end={96351802}
                  duration={2.75}
                  separator=" "
                  decimal=","
                  className="countUp"
                />
              </h3>
            </div>
          </div>
        </ScrollAnimation>
      </div>
      <div className="dashboard-page mt-3">
        <div className="left-side">
          <div className="graphs">
            <div className="main-graphs">
              <Graphs />
              <ScrollAnimation animateIn="zoomIn">
                <Barc />
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashbord;
