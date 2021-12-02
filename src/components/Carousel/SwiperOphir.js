import React, { useState } from "react";
import "./SwiperOphir.scss";
import config from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleRight,
  faChevronCircleLeft,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

function SwiperOphir({ images }) {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };
  const handleStart = (e) => {
    console.log(`e.clientX`, e.clientX);
    setTouchStart(e.clientX);
    setTouchEnd(e.clientX);
  };
  const handleMove = (e) => {
    setTouchEnd(e.clientX);
  };
  const handleEnd = () => {
    const distance = touchEnd - touchStart;
    console.log(`distance`, distance);
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  return (
    <section className="Carousel">
      {images.length > 1 && (
        <div>
          <FontAwesomeIcon
            className="right slide-arrow"
            icon={faChevronCircleRight}
            size="lg"
            color="#fefefe"
            onClick={nextSlide}
          />
          <FontAwesomeIcon
            className="left slide-arrow"
            icon={faChevronCircleLeft}
            size="lg"
            color="#fefefe"
            onClick={prevSlide}
          />
        </div>
      )}
      {images.map((image, i) => {
        return (
          <div className={i === current ? "slide active" : "slide"} key={i}>
            {/* {i === current && ( */}
            <img
              draggable="false"
              onMouseDown={handleStart}
              onTouchStart={handleStart}
              onMouseMove={handleMove}
              onTouchMove={handleMove}
              onMouseUp={handleEnd}
              onTouchEnd={handleEnd}
              className="image"
              src={config.apiUrl + "/" + image}
              alt={image.description}
            />
            {/* )} */}
          </div>
        );
      })}
      {images.length > 1 && (
        <div className="dots">
          {images.map((image, index) => (
            <FontAwesomeIcon
              onClick={() => setCurrent(index)}
              className={index === current ? "dot active" : "dot"}
              key={index}
              icon={faCircle}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default SwiperOphir;
