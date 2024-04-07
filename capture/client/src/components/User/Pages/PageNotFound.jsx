import React from 'react'
import { Link } from 'react-router-dom'
import '../CSS/user.css'

function PageNotFound() {
    return (
        <div className='page-not-found'>
            <div className='error-message'>
                <h1 className='main-error-message'>404</h1>
                <h4 className='sorry-heading'>Sorry, Page not found <i className="ri-error-warning-line"></i></h4>
                <Link to={"/"} className='goto-home-page-btn'>Goto Home Page</Link>
            </div>
        </div>
    )
}

export default PageNotFound
