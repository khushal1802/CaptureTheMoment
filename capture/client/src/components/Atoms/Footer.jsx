import React from 'react'
import './components.css'
import Logo from './Logo'
import { Link } from "react-router-dom";
import ScrollAnimation from 'react-animate-on-scroll';


function Footer() {
    return (
        <ScrollAnimation animateIn="slideInUp">

        <div className='footer'>
            <div className='footer-content'>
                <div className="first">
                    <div className='footer-logo'>
                        <Logo />
                    </div>    
                    <p className='footer-info'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima repellat perferendis debitis eos eveniet laboriosam optio facere consequuntur, provident beatae dolor nulla, cupiditate voluptatem delectus?</p>
                </div>

                <div className="second">
                    <ul>
                        <Link to={'/'}><li>Home</li></Link>
                        <Link to={'/about'}><li>About Us</li></Link>
                        <Link to={'/photography'}><li>Photography</li></Link>
                        <Link to={'/films'}><li>Videography</li></Link>
                        <Link to={'/blog'}><li>Blog </li></Link>
                        <Link to={'/contact'}><li>Contect Us</li></Link>
                    </ul>
                </div>

                <div className="third">
                    <h5>Follow Together Studio</h5>
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

                <div className="forth">
                    <h5>Morder Indian Wedding Photography</h5>

                    <div className="footer-contact">
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
                            <p>Vraj Vatika Khanderao Market, Vadodara,Surat,390001,India</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <p className='copyright'>Copyright © 2008-2022 CaptureTheMoment @/ Studio Thoda Strong. All rights reserved.</p>
            </div>
        </div>
        </ScrollAnimation>
    )
}

export default Footer