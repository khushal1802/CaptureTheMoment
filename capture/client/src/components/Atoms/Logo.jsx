import React from 'react'
import './components.css'

function Logo(){
    return(
        <>
            {/* ---------- Logo ---------- */}
            <div className="logo">
                <div className="logo-left-side">
                    <i className="ri-camera-lens-line camera-lens"></i>
                </div>
                <div className="logo-right-side">
                    <p className="logo-heading">Capture The <br/> Moments.</p>
                </div>
            </div>
        </>
    );
}

export default Logo;