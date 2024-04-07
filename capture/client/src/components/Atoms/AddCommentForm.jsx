import React, { useRef, useState } from 'react';
import './components.css';
import FormBackground from './FormBackground';
import { useDispatch } from 'react-redux';
import { POST_COMMENT_PROGRESS } from '../../redux-saga/Admin/comment/commentAction';
import { toast } from 'react-toastify';
import ScrollAnimation from 'react-animate-on-scroll';


function CommentForm() {
    const name = useRef();
    const img = useRef();
    const dec = useRef();
    const dispatch = useDispatch();

    const [textareaBorder, setTextareaBorder] = useState(false);
    const fieldBorderColor = {
        border: textareaBorder === true ? "2px solid var(--main-color)" : "2px solid var(--secondary-color)",
    };
    const legendTextColor = {
        color: textareaBorder === true ? "var(--main-color)" : "var(--secondary-text-color)",
    };
    const [errors, setErrors] = useState({
        name: "",
        image: "",
        description: "",
    });

    const validateForm = () => {
        setErrors({
            name: name.current.value ? "" : "Name is required",
            image: img.current.files[0] ? "" : "Image is required",
            description: dec.current.value ? "" : "Description is required",
        });

        return name.current.value && img.current.files[0] && dec.current.value;
    };

    const handalSubmit = () => {
        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append("name", name.current.value);
        formData.append("image", img.current.files[0]);
        formData.append("description", dec.current.value);

        dispatch({
            type: POST_COMMENT_PROGRESS,
            payload: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        toast.success("Comment added successfully", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        // Clear form fields after submission
        name.current.value = "";
        img.current.value = "";
        dec.current.value = "";
    };

    return (
        <div id='comment-section'>
            <div id="comment-left-section">
        <ScrollAnimation animateIn="slideInLeft" style={{width:"100%"}}>

                {/* comment-us form */}
                <div className="comment-form-section">
                    <div className="comment">
                        <div className="comment-form-heading">
                            <p className='main-heading'>Comment Form</p>
                            <h2>Share Your Thoughts</h2>
                            <p className='heading-discription'>Share Your Thoughts and Impressions - We'd Love to Hear from You!</p>
                        </div>

                        {/* form */}
                        <div className="comment-from">
                                <div className="form">
                                    <input
                                        type="text"
                                        className={`mb-3 fild ${errors.name ? "is-invalid" : ""}`}
                                        id="name"
                                        name="name"
                                        ref={name}
                                        placeholder='Couple Name'
                                        autoComplete='off'
                                    />
                                    <div className="invalid-feedback">{errors.name}</div>
                                </div>

                                <div className="form">
                                    <fieldset style={fieldBorderColor}>
                                        <legend style={legendTextColor}>Comment</legend>
                                        <textarea
                                            className={`mb-3 ${errors.description ? "is-invalid" : ""}`}
                                            type="text"
                                            id="dec"
                                            name="description"
                                            ref={dec}
                                            rows="2"
                                            placeholder='Please type your comment here...'
                                            onFocus={() => setTextareaBorder(true)}
                                            onBlur={() => setTextareaBorder(false)}
                                        />
                                        <div className="invalid-feedback">{errors.description}</div>
                                    </fieldset>
                                </div>

                                <div className="form">
                                    <label htmlFor="fileInput" className="couple-picture">
                                        <span>Upload Couple Picture</span>
                                    </label>
                                    <input
                                        id="fileInput"
                                        className={`mb-3 fild ${errors.image ? "is-invalid" : ""}`}
                                        type="file"
                                        name="img"
                                        ref={img}
                                    />
                                    <div className="invalid-feedback">{errors.image}</div>
                                </div>

                                <div className="form">
                                    <button type="submit" className='sentCommentBtn' onClick={handalSubmit}>
                                        Send Comment
                                    </button>
                                </div>
                        </div>
                    </div>
                </div>
                </ScrollAnimation>
            </div>
            <div id="comment-right-section">
                <FormBackground />
            </div>
        </div>
    );
}

export default CommentForm;
