import '../CSS/user.css';
import Logo from '../../Atoms/Logo';
import FormBackground from '../../Atoms/FormBackground';
import { useState } from 'react';
import { POST_USER_PROGRESS, UPDATE_USER_PROGRESS } from '../../../redux-saga/Admin/user/userAction';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const navigator =useNavigate()
    const [view, setView] = useState({
        Name: "",
        Profile: "",
        Password: "",
        DOB: "",
        Phone: "",
        Email: "",
        Address: "",
    });
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch();

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org)$/;
        const phoneRegex = /^\d{10}$/;

        const errors = {
            Name: view.Name.trim() === "" ? "User Name is required" : "",
            Profile: view.Profile ? "" : "Profile is required",
            Password: view.Password.trim() === "" ? "Password is required" : "",
            DOB: view.DOB.trim() === "" ? "Date of Birth is required" : "",
            Phone:
                view.Phone === "" || !phoneRegex.test(view.Phone)
                    ? "Please enter a valid 10-digit phone number"
                    : "",
            Email:
                view.Email.trim() === "" || !emailRegex.test(view.Email)
                    ? "Please enter a valid email address with 'com', 'net', or 'org' domain"
                    : "",
            Address: view.Address.trim() === "" ? "Address is required" : "",
        };

        setValidationErrors(errors);

        return Object.values(errors).every((error) => error === "");
    };

    const handleAddUser = () => {
        if (validateForm()) {
            const formData = new FormData();
            formData.append("Password", view.Password);
            formData.append("Name", view.Name);
            formData.append("DOB", view.DOB);
            formData.append("Address", view.Address);
            formData.append("Phone", view.Phone);
            formData.append("Email", view.Email);
            formData.append("Profile", view.Profile);

            console.log(view);
            dispatch({
                type: POST_USER_PROGRESS,
                payload: formData,
            });

            toast.success("User added successfully");
            clear();
            navigator('/')
        } else {
            toast.error("Please fix the validation errors");
        }
    };

    const handleInputChange = (e) => {
        setView((view) => ({
            ...view,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFileChange = (e) => {
        setView((prevView) => ({
            ...prevView,
            Profile: e.target.files[0],
        }));
    };

    const clear = () => {
        setView({
            Name: "",
            Profile: "",
            Password: "",
            DOB: "",
            Phone: "",
            Email: "",
            Address: "",
        });
    };

    return (
        <div className='signup-form-section'>
            {/* ---------- signup-left-section ---------- */}
            <div className="signup-left-section">
                <div className="signup-nav">
                    <Logo />
                </div>

                {/* ---------- signup-section ---------- */}
                <div className="signup-section">
                    <div className="signup">
                        {/* signup-heading */}
                        <div className="signup-heading">
                            <h2>Create Your Account</h2>
                            <p>Let's kick things off by getting to know our school better</p>
                        </div>

                        {/* signup-form */}
                        <div className="signup-form">
                            <form action="">
                                <div className="form">
                                    <input type="text" id="userName" className={`mb-3 fild ${validationErrors.Name ? "is-invalid" : ""
                                        }`}
                                        name="Name"
                                        onChange={handleInputChange}
                                        value={view.Name} placeholder='Full Name' autoComplete='off' />
                                    <div className="invalid-feedback">
                                        {validationErrors.Name}
                                    </div>
                                </div>

                                <div className="form">
                                    <input type="email" id="email" className={`mb-3 fild ${validationErrors.Email ? "is-invalid" : ""
                                        }`}
                                        name="Email"
                                        onChange={handleInputChange}
                                        value={view.Email} placeholder='Email' autoComplete='off' />
                                    <div className="invalid-feedback">
                                        {validationErrors.Email}
                                    </div>
                                </div>

                                <div className="form">
                                    <input type="text" id="address" className={`mb-3 fild ${validationErrors.Address ? "is-invalid" : ""
                                        }`}
                                        name="Address"
                                        onChange={handleInputChange}
                                        value={view.Address} placeholder='Address' autoComplete='off' />
                                    <div className="invalid-feedback">
                                        {validationErrors.Address}
                                    </div>
                                </div>

                                <div className="form">
                                    <input className={`mb-3 fild ${validationErrors.Phone ? "is-invalid" : ""
                                        }`}
                                        type="tel"
                                        name="Phone"
                                        id="pno" placeholder='Phone Number' autoComplete='off'
                                        onChange={handleInputChange}
                                        value={view.Phone} />
                                    <div className="invalid-feedback">
                                        {validationErrors.Phone}
                                    </div>
                                </div>

                                <div className="form">
                                    <input type="date" id="dob" className={`mb-3 fild ${validationErrors.DOB ? "is-invalid" : ""
                                        }`}
                                        name="DOB"
                                        onChange={handleInputChange}
                                        value={view.DOB} />
                                    <div className="invalid-feedback">
                                        {validationErrors.DOB}
                                    </div>
                                </div>

                                <div className="form">
                                    <input type="password" id="Password" className={`mb-3 fild ${validationErrors.Password ? "is-invalid" : ""
                                        }`}
                                        name="Password"
                                        onChange={handleInputChange}
                                        value={view.Password} placeholder='Password' autoComplete='off' />
                                    <div className="invalid-feedback">
                                        {validationErrors.Password}
                                    </div>
                                </div>

                                <div className="form">
                                    <label htmlFor="fileInput" className="upload-picture">
                                        <span>Upload Profile Picture</span>
                                    </label>
                                    <input id="fileInput" type="file" className={`mb-3 fild ${validationErrors.Profile ? "is-invalid" : ""
                                        }`}
                                        name="img"
                                        onChange={handleFileChange}></input>
                                    <div className="invalid-feedback">
                                        {validationErrors.Profile}
                                    </div>
                                </div>

                                <div className="form">
                                    <button type="button" className='signupBtn' onClick={handleAddUser}>Signup</button>
                                </div>
                            </form>
                        </div>

                        {/* Signup-footer */}
                        <div className="signup-footer">
                            <p className="question">Already have an account? <Link to={"/UserLogin"} className='user-login-link'>Log in</Link></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------- signup-right-section ---------- */}
            <div className="signup-right-section">
                <FormBackground />
            </div>
        </div>
    );
}

export default Signup;
