import React from 'react'
import '../CSS/user.css'
import Footer from '../../Atoms/Footer'
// import photographer from '../Images/photographer_1.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { GET_PHOTO_PROGRESS } from '../../../redux-saga/Admin/photo/photoAction';
import { useState } from 'react';
import { LoaderContext } from '../../../LoaderContext';
import ScrollAnimation from 'react-animate-on-scroll';

function Photography() {
    const { setloader } = React.useContext(LoaderContext)

    const [image, setimage] = useState('')
    const Photo = useSelector((state) => state.photoReducer.photo);
    const dispatch = useDispatch();

    useEffect(() => {
        setloader(true)
        dispatch({ type: GET_PHOTO_PROGRESS });
        setTimeout(() => { setloader(false) }, 2000)
    }, []);

    return (
        <section >
            <div className="couple-photography-section">
      <ScrollAnimation animateIn="slideInDown">

                <div className="couple-photography-heading">
                    <div className='photography-inner-heading'>
                        <div className="line"></div>
                        <p>Our photography</p>
                        <div className="line"></div>
                    </div>
                    <h2>Modern Indian Wedding Photography for the Discerning Couple</h2>
                    <p className='photography-info'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis enim dolore temporibus officiis, aperiam tenetur perferendis nulla, error labore vitae laborum facilis incidunt inventore hic obcaecati adipisci ipsam sint suscipit nemo aspernatur eveniet sit. Unde ab numquam placeat est laudantium mollitia, facere consequuntur repellat sunt tenetur. Eos corrupti hic dolorem?</p>
                </div>
                </ScrollAnimation>
                <div className="couple-photos-section">
                    <div className="couple-photos">
                        {
                            Photo?.map((val, ind) => {
                                return (
                                    <ScrollAnimation animateIn="zoomIn">

                                    <div key={ind}>
                                        <div className="photography-card" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => { setimage(val.image) }}>
                                            <img src={val.image} alt="Photography" />
                                            <i className="ri-focus-mode focus-image"></i>
                                        </div>
                                    </div>
                                    </ScrollAnimation>
                                )
                            })
                        }
                    </div>

                    {/* Model Box */}
                    <div className="modal fade photo-viewer" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="image">
                                        <img src={image} alt="Couple_image" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className='close-btn' data-bs-dismiss="modal" >
                                        <i className="ri-close-line"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
}

export default Photography

