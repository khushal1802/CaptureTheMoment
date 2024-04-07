import React, { useEffect } from "react";
import "../CSS/user.css";
import Footer from "../../Atoms/Footer";
// import blogImage from '../Images/photographer_1.jpg'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GET_BLOG_PROGRESS } from "../../../redux-saga/Admin/blog/blogAction";
import { LoaderContext } from "../../../LoaderContext";
import ScrollAnimation from "react-animate-on-scroll";

function Blog() {
  const { setloader } = React.useContext(LoaderContext);
  const Blog = useSelector((state) => state.blogReducer.blog);
  const dispatch = useDispatch();
  const last = Blog.slice(-20);

  useEffect(() => {
    setloader(true);
    dispatch({ type: GET_BLOG_PROGRESS });
    setTimeout(() => {
      setloader(false);
    }, 2000);
  }, []);
  return (
    <section>
      <div className="blog-section">
      <ScrollAnimation animateIn="slideInDown">

        <div className="blog-heading">
          <div className="left-blog-title">
            <div className="left-blog-inner-title">
              <div className="line"></div>
              <p className="head">Blog</p>
              <div className="line"></div>
            </div>
            <h1>The Wedding Photography Blog</h1>
            <p className="blog-info">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam
              quam molestias expedita. Odio voluptas corporis illum quasi
              nesciunt sed. Iusto adipisci excepturi impedit modi consequuntur
              ut accusamus pariatur perspiciatis, ab enim inventore illo non
              illum praesentium sed facere tempora eveniet dolores laborum
              nesciunt. Quas quod deleniti beatae rerum. Amet, quibusdam?
            </p>
          </div>

          <div className="right-blog-title">
            <Link to={"/addblog"} className="open-link">
              <button type="button" className="addBlogBtn">
                <i className="ri-add-line"></i> <p>Add Blog</p>
              </button>
            </Link>
          </div>
        </div>
</ScrollAnimation>
        <div className="blogs">
          {last?.map((val, ind) => {
            return (
              <ScrollAnimation animateIn="zoomInDown">
                <div className="blog-card" key={ind}>
                  <div className="left-blog-card">
                    <img src={val.image} alt="" />
                  </div>
                  <div className="right-blog-card">
                    <div className="blog-title">
                      <h3>{val.title}</h3>
                    </div>
                    <div className="blog-description">
                      <p className="blog-info">{val.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </section>
  );
}

export default Blog;
