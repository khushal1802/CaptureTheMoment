import React, { useRef, useState } from 'react';
import '../CSS/user.css';
import { useDispatch, useSelector } from 'react-redux';
import { POST_CONTACT_PROGRESS } from '../../../redux-saga/Admin/contact/contactAction';
import { toast } from 'react-toastify';
import ScrollAnimation from 'react-animate-on-scroll';

function Contact() {
    const dispatch = useDispatch();
    const fname = useRef();
    const lname = useRef();
    const email = useRef();
    const phone = useRef();
    const dec = useRef();
  const Contact = useSelector((state) => state.contactReducer.contact);
    const [validationErrors, setValidationErrors] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        description: "",
    });
    const [textareaBorder, setTextareaBorder] = useState(false);
    const fieldBorderColor = {
        border: textareaBorder === true ? "2px solid var(--main-color)" : "2px solid var(--secondary-color)",
    };

    const legendTextColor = {
        color: textareaBorder === true ? "var(--main-color)" : "var(--secondary-text-color)",
    };

    const validateForm = () => {
        const allowedDomains = ["com", "net", "org"];
        const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org)$/;

        const errors = {
            fname: fname.current.value.trim() === "" ? "First Name is required" : "",
            lname: lname.current.value.trim() === "" ? "Last Name is required" : "",
            email:
                email.current.value.trim() === ""
                    ? "Email is required"
                    : !emailRegex.test(email.current.value)
                    ? "Please enter a valid email address with 'com', 'net', or 'org' domain"
                    : "",
            phone:
                phone.current.value.trim() === "" || !/^\d{10}$/.test(phone.current.value)
                    ? "Please enter a valid 10-digit phone number"
                    : "",
            description: dec.current.value.trim() === "" ? "Description is required" : "",
        };

        setValidationErrors(errors);

        return Object.values(errors).every((error) => error === "");
    };

    const handalSubmit = () => {
        if (validateForm()) {
            const data = {
                fname: fname.current.value,
                lname: lname.current.value,
                email: email.current.value,
                phone: phone.current.value,
                description: dec.current.value,
            };
            dispatch({
                type: POST_CONTACT_PROGRESS,
                payload: data,
            });

            toast.success("Contact added successfully", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            fname.current.value=""
            lname.current.value=""
            email.current.value=""
            phone.current.value=""
            dec.current.value=""
        }
    };

    return (
        <div id='contact-us'>
            <div id="contact-us-left">

                {/* contact-us form */}
                <div className="contact-section">
                <ScrollAnimation animateIn="slideInLeft" style={{display : "flex", justifyContent : "center", alignItems:"center", width:"100%"}}>

                    <div className="contact">
                        <div className="contact-form-heading">
                            <p className='main-heading'>Contact Us</p>
                            <h2>Have More Question?</h2>
                            <p className='heading-discription'>Complete the form below to send us a Message. Our Support team will Promptly respond to your request.</p>
                        </div>

                        {/* form */}
                        <div className="contact-from">
                                <div className="full-name">
                                    <div className="form">
                                        <input
                                            className={`${validationErrors.fname ? "is-invalid" : ""
                                                }`}
                                            type="text"
                                            id="fname"
                                            name="fname"
                                            ref={fname}
                                            placeholder='First Name' autoComplete='off'
                                        />
                                        <div className="invalid-feedback">
                                            {validationErrors.fname}
                                        </div>
                                    </div>
                                    <div className="form">
                                        <input
                                            className={`mb-3 fild ${validationErrors.lname ? "is-invalid" : ""
                                                }`}
                                            type="text"
                                            id="lname"
                                            name="lname"
                                            ref={lname}
                                            placeholder='Last Name' autoComplete='off' />
                                        <div className="invalid-feedback">
                                            {validationErrors.lname}
                                        </div>
                                    </div>
                                </div>

                                <div className="form">
                                    <input
                                        className={`mb-3 fild ${validationErrors.email ? "is-invalid" : ""
                                            }`}
                                        type="email"
                                        id="email"
                                        name="email"
                                        ref={email} placeholder='Email' autoComplete='off' />
                                    <div className="invalid-feedback">
                                        {validationErrors.email}
                                    </div>
                                </div>

                                <div className="form">
                                    <input
                                        className={`mb-3 fild ${validationErrors.phone ? "is-invalid" : ""
                                            }`}
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        ref={phone} placeholder='Phone Number' autoComplete='off' />
                                    <div className="invalid-feedback">
                                        {validationErrors.phone}
                                    </div>
                                </div>

                                <div className="form">
                                    <fieldset style={fieldBorderColor}>
                                        <legend style={legendTextColor}>Messge</legend>
                                        <textarea
                                            className={`mb-3 ${validationErrors.description ? "is-invalid" : ""
                                                }`}
                                            id="dec"
                                            name="description"
                                            ref={dec}
                                            rows="2"
                                            placeholder='Please type your message here...'
                                            onFocus={() => {
                                                setTextareaBorder(true)
                                            }}
                                            onBlur={() => {
                                                setTextareaBorder(false)
                                            }}>
                                        </textarea>
                                        <div className="invalid-feedback">
                                            {validationErrors.description}
                                        </div>
                                    </fieldset>
                                </div>

                                <div className="form">
                                    <button type="submit" className='sentMessageBtn' value="Submit"
                                        onClick={handalSubmit}>Send Message</button>
                                </div>
                        </div>
                    </div>
                    </ScrollAnimation>
                </div>
            </div>
                <ScrollAnimation animateIn="slideInRight" style={{display : "flex", justifyContent : "center", alignItems:"center", width:"100%"}}>
            <div id="contact-us-right">
                {/* <FormBackground /> */}

                <div className="contact-right-top">
                    <div className="c-left">
                        <h4>Contact Information</h4>
                        <div className='contact-right-info'>
                            <div className="contact-info">
                                <i className="ri-mail-line"></i>
                                <p>Capturethemoments555@gmail.com</p>
                            </div>
                            <div className="contact-info">
                                <i className="ri-phone-line"></i>
                                <p>+91 1234567890</p>
                            </div>
                            <div className="contact-info">
                                <i className="ri-map-pin-line"></i>
                                <p>Varachha Main Rd, near Gurunagar Gate, Vallabhnagar Society, Varachha, Surat, Gujarat 395006</p>
                            </div>
                        </div>
                    </div>
                    <div className="c-right">
                        <h4>Follow Together Studio</h4>
                        <div className="social-media">
                        <a href='https://www.instagram.com/' target='_blank'>
                        <div className="social-media-content">
                            <i className="ri-instagram-line"></i>
                            <p>Instagram</p>
                        </div>
                        </a>
                        <a href='https://www.facebook.com/' target='_blank'>
                        <div className="social-media-content">
                            <i className="ri-facebook-box-line"></i>
                            <p>Facebook</p>
                        </div>
                        </a>
                        <a href="https://www.twitter.com/">
                        <div className="social-media-content">
                            <i className="ri-twitter-x-line"></i>
                            <p>Twitter</p>
                        </div>
                        </a>
                    </div>
                    </div>
                </div>
                <div className="contact-right-bottom">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.4844837290607!2d72.8575718793457!3d21.212628457655967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f1a519c0121%3A0x62f5a31f1639128f!2sHirabaugh%2C%20Surat%2C%20Gujarat%20395006!5e0!3m2!1sen!2sin!4v1709617524117!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    <div className='layer'></div>
                </div>
            </div>
                </ScrollAnimation>
        </div>
    )
}

export default Contact