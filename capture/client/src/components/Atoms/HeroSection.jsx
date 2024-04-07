import wedding from '../User/Video/background-video.mp4'
import ScrollAnimation from 'react-animate-on-scroll';

function BackgroundVideo(){
    return(
        <div className="hero-section">
            <video autoPlay muted loop className="couple-marriage-video">
                    <source src={wedding} type="video/mp4" />
            </video>
            <div className="hero-section-content">
            <ScrollAnimation animateIn="fadeInUp">
                <h1>Contemporary and Off-Beat <br /> Wedding Stories</h1>
                <div className="line-box">
                    <div className="line"></div>
                    <p>For the Morden Couple</p>
                    <div className="line"></div>
                </div>
            </ScrollAnimation>
            </div>
            <i className="ri-arrow-down-line down-arrow"></i>
        </div>
    );
}

export default BackgroundVideo;