import React from 'react'
import formBackgroundImage from '../User/Images/photographer_1.jpg';
import './components.css';
import ScrollAnimation from 'react-animate-on-scroll';

function FormBackground(){
    return(
        <>
        <ScrollAnimation animateIn="slideInRight">
            <div className="form-background">
                <img src={formBackgroundImage} alt="backgroundImage" />
            </div>
        </ScrollAnimation>
        </>
    );
}

export default FormBackground;