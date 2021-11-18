import React from 'react';
import config from "../../config";
import './Carousel.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel({ images }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <Slider className="Carousel" as="ol" {...settings}>
            {images.map((image, i) => (
                <div key={i}>
                    <img src={config.apiUrl + '/' + image} alt=""/>
                </div>
            ))}
        </Slider>
    );
}

export default Carousel;