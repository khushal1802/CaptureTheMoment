import React, { useEffect } from "react";
import "../CSS/user.css";
import photoGrapherTeam from "../Images/photographer_team.jpg";
// import photographer from '../Images/photographer_1.jpg';

import Owner from "../../Atoms/Owner";
import Footer from "../../Atoms/Footer";
import { useDispatch, useSelector } from "react-redux";
import { GET_TEAM_PROGRESS } from "../../../redux-saga/Admin/team/teamAction";
import { LoaderContext } from "../../../LoaderContext";
import ScrollAnimation from "react-animate-on-scroll";

function About() {
  const { setloader } = React.useContext(LoaderContext);
  const Team = useSelector((state) => state.teamReducer.team);
  const dispatch = useDispatch();

  console.log(Team);
  useEffect(() => {
    setloader(true);
    dispatch({ type: GET_TEAM_PROGRESS });
    setTimeout(() => {
      setloader(false);
    }, 2000);
  }, []);
  return (
    <div>
      <div style={{ padding: "0vw 5vw" }}>
        <div className="photographer-group-section">
        <ScrollAnimation animateIn="slideInDown">

          <div className="about-info">
            <div className="team-heading">
              <div className="line"></div>
              <h1>Our Team</h1>
              <div className="line"></div>
            </div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut enim
              temporibus eligendi facere quo? Suscipit adipisci ipsa eum
              expedita neque omnis officia, et vitae magnam, perferendis
              doloremque. Corrupti non, dolor magni ducimus perspiciatis dolorem
              earum pariatur doloribus voluptatibus illum dignissimos
              consectetur quisquam accusamus, voluptate perferendis, molestiae
              vitae eveniet explicabo atque voluptates hic? Recusandae impedit
              explicabo consectetur facilis provident repellendus aliquam ad
              aliquid accusamus, laboriosam ab natus a distinctio! Ratione
              quidem dicta ut perferendis, minus, vel, deserunt sit aspernatur
              vitae perspiciatis facilis nobis rem mollitia corporis molestias
              obcaecati maxime quaerat aut illum. Odit eius ipsam quae iure eum?
              Enim facere labore consequuntur reprehenderit a aliquid nostrum
              ipsam ratione blanditiis, vitae quam nesciunt, pariatur eaque
              impedit sed, aperiam aspernatur commodi magni iure.
            </p>
          </div>
</ScrollAnimation>

          <div className="group-photo">
            <img src={photoGrapherTeam} alt="" />
          </div>

          <div>
            <Owner />
          </div>

          <div className="our-teammates" style={{ paddingTop: "30px" }}>
            <div className="team-heading">
              <div className="line"></div>
              <h1>The Team</h1>
              <div className="line"></div>
            </div>

            <div className="teammates">
              {Team?.map((val, ind) => {
                return (
                    <ScrollAnimation animateIn="zoomIn">

                  <div className="team-member" key={ind}>
                    <div className="top-section">
                      <img src={val.photo} alt="Photographer" />
                    </div>
                    <div className="bottom-section">
                      <h1>{val.name}</h1>
                      <h2>{val.role}</h2>
                      <p>{val.description}</p>
                    </div>
                  </div>
                  </ScrollAnimation>
                );
              })}
            </div>
          </div>

          {/* achievement-section */}
          <ScrollAnimation animateIn="zoomInDown">
            <div className="achievement-section">
              <div className="achievement-heading">
                <div className="head">
                  <div className="line"></div>
                  <h1>Achievements</h1>
                  <div className="line"></div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                  natus quis, corrupti placeat nemo obcaecati atque odio esse
                  commodi quas.
                </p>
              </div>
              <div className="achievement">
                <div className="achieve">
                  <i className="ri-article-line"></i>
                  <h2>Published</h2>
                  <p>
                    India Today | The Times of India | Indian Express |
                    Hindustan Times | DNA | Better Photography | Economic Times
                    | Money Control | Asian Photography | First Post | Business
                    Insider | Huffington Post | Forbes | Little Black Book |
                    POPxo | NDTV | CNBC TV18 | Vagabomb | BollywoodShaadis.com |
                    WeddingSutra | WedmeGood etc.
                  </p>
                </div>
                <div className="achieve">
                  <i className="ri-medal-line"></i>
                  <h2>Accolades</h2>
                  <p>
                    Wedding Film-maker of the Year 2020 Nominee, WeddingSutra
                  </p>
                  <p>
                    Wedding Photographer of the Year Award (2011), Kodak +
                    Better Photography
                  </p>
                  <p>Top 100 Photography Blogs (2019 & 2020), Feedspot</p>
                  <p>Top 50 Photography Blogs (2020)</p>
                </div>
                <div className="achieve">
                  <i className="ri-shake-hands-line"></i>
                  <h2>Brand Associations</h2>
                  <p>Nikon Brand Ambassador, 2016-2017</p>
                  <p>2018 Winners and Shortlist and Commended Galleries</p>
                  <p>Fujifilm India X Brand Ambassador, 2018 Onwards</p>
                  <p>Godox India National Brand Ambassador, 2019 Onwards</p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
