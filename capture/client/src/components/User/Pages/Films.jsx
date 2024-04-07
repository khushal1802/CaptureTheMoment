import React, { useState } from 'react'
import '../CSS/user.css'
import Footer from '../../Atoms/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import{ GET_VIDEO_PROGRESS } from '../../../redux-saga/Admin/video/videoAction';
import { LoaderContext } from '../../../LoaderContext';
import ScrollAnimation from 'react-animate-on-scroll';

function Films() {
    const { setloader } = React.useContext(LoaderContext)

const [video, setvideo] = useState('')
const Video = useSelector((state) => state.videoReducer.video);
    const dispatch = useDispatch();

    useEffect(() => {
    setloader(true)
      dispatch({ type: GET_VIDEO_PROGRESS });
      setTimeout(() => { setloader(false) }, 2000)
    }, []);
    return (
        <section>
            <div className="couple-film-section">
            <ScrollAnimation animateIn="slideInDown">

                <div className="couple-film-heading">
                    <div className='film-inner-heading'>
                        <div className="line"></div>
                        <p>Our Filmgraphy</p>
                        <div className="line"></div>
                    </div>
                    <h2>Indian Wedding Movies and Films</h2>
                    <p className='film-info'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nesciunt, tempore consectetur explicabo, ab molestiae, assumenda officia repellendus sed ipsam sunt consequuntur placeat ipsa dolorem quos cupiditate ex sapiente itaque est nobis odit quod. Rem, enim saepe sunt non quae voluptate voluptatum sit sed maxime sint nostrum molestias fuga quis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga voluptatibus placeat iusto! Tempora dicta et nisi voluptatibus quae exercitationem, veniam minus quas fuga cumque explicabo, nesciunt debitis doloribus qui dolores ut eos fugiat unde neque nulla numquam rerum? Laudantium, veritatis! Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                </div>
                </ScrollAnimation>
                
                <div className="wedding-films">
                    {
                        Video?.map((val,ind)=>{
                            return (
                                <ScrollAnimation animateIn="zoomIn">

                    <div className="wedding-film-card" data-bs-toggle="modal" data-bs-target="#staticBackdrop" key={ind} onClick={()=>setvideo(val.video)}>
                        <div className="wedding-film-video">
                            <video autoPlay muted loop>
                                <source src={val.video} type="video/mp4" />
                            </video>
                        </div>
                        <div className="wedding-film-info" style={{marginTop: "10px"}}>
                            <h3 
                                className='couple-name' 
                                style={{margin: "0", fontWeight: "700"}}
                                >{val.name}
                            </h3>
                            <p 
                                className='film_discription' 
                                style={{margin: "0", paddingTop: "5px"}}
                                >{val.description}
                            </p>
                        </div>
                    </div>
                    </ScrollAnimation>
                            )
                        })
                    }
                </div>

                {/* Model Box */}
                <div className="modal fade film-viewer" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content hi">
                            <div className="modal-body">
                                <video controls muted autoPlay loop src={video}>
                                </video>
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
            <Footer />
        </section>
    )
}

export default Films