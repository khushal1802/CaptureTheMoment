import React, { useRef, useState } from "react";
import "./components.css";
import FormBackground from "./FormBackground";
import { POST_BLOG_PROGRESS } from "../../redux-saga/Admin/blog/blogAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ScrollAnimation from "react-animate-on-scroll";

function BlogForm() {
  const title = useRef();
  const img = useRef();
  const dec = useRef();
  const [errors, setErrors] = useState({
    title: "",
    image: "",
    description: "",
  });
  const dispatch = useDispatch();

  const [textareaBorder, setTextareaBorder] = useState(false);
  const fieldBorderColor = {
    border:
      textareaBorder === true
        ? "2px solid var(--main-color)"
        : "2px solid var(--secondary-color)",
  };
  const legendTextColor = {
    color:
      textareaBorder === true
        ? "var(--main-color)"
        : "var(--secondary-text-color)",
  };

  const validateForm = () => {
    setErrors({
      title: title.current.value ? "" : "Title is required",
      image: img.current.files[0] ? "" : "Image is required",
      description: dec.current.value ? "" : "Description is required",
    });

    return title.current.value && img.current.files[0] && dec.current.value;
  };

  const handalSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("title", title.current.value);
    formData.append("image", img.current.files[0]);
    formData.append("description", dec.current.value);

    dispatch({
      type: POST_BLOG_PROGRESS,
      payload: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Blog added successfully", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    title.current.value = "";
    img.current.value = "";
    dec.current.value = "";
  };

  return (
    <div className="blog-form-section">
      <div className="left-blog-form-section">
        <ScrollAnimation animateIn="slideInLeft" style={{width:"100%"}}>
          <div className="blogForm-section">
            <div className="blog-form">
              <div className="blog-form-heading">
                <p className="main-heading">Blog Form</p>
                <h2>Share Your Thoughts</h2>
                <p className="heading-discription">
                  Share Your Thoughts and Impressions - We'd Love to Hear from
                  You!
                </p>
              </div>

              <div className="blogForm">
                <div className="form">
                  <input
                    className={`mb-3 fild ${errors.title ? "is-invalid" : ""}`}
                    type="text"
                    id="title"
                    name="title"
                    ref={title}
                    placeholder="Blog Title"
                    autoComplete="off"
                  />
                  <div className="invalid-feedback">{errors.title}</div>
                </div>

                <div className="form">
                  <fieldset style={fieldBorderColor}>
                    <legend style={legendTextColor}>Description:</legend>
                    <textarea
                      className={`mb-3 ${
                        errors.description ? "is-invalid" : ""
                      }`}
                      id="dec"
                      name="description"
                      ref={dec}
                      rows="5"
                      placeholder="Please type your blog here..."
                      onFocus={() => {
                        setTextareaBorder(true);
                      }}
                      onBlur={() => {
                        setTextareaBorder(false);
                      }}
                    ></textarea>
                    <div className="invalid-feedback">{errors.description}</div>
                  </fieldset>
                </div>

                <div className="form">
                  <label htmlFor="fileInput" className="blog-picture">
                    <span>Upload Blog Picture</span>
                  </label>
                  <input
                    className={`mb-3 fild ${errors.image ? "is-invalid" : ""}`}
                    type="file"
                    name="img"
                    ref={img}
                    id="fileInput"
                  ></input>
                  <div className="invalid-feedback">{errors.image}</div>
                </div>

                <div className="form">
                  <button
                    type="submit"
                    className="sendBlogBtn"
                    onClick={handalSubmit}
                  >
                    Send Blog
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>

      <div className="right-blog-form-section">
        <FormBackground />
      </div>
    </div>
  );
}

export default BlogForm;
