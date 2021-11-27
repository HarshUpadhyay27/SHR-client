import React from "react";
import { useSelector } from "react-redux";

const Carousel = ({ images, id }) => {
  const { theme } = useSelector((state) => state);

  const isActive = (index) => {
    if (index === 0) return "active";
  };

  return (
    <div id={`image${id}`} className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {images.map((img, index) => (
          <button
            type="button"
            data-bs-target={`#image${id}`}
            data-bs-slide-to={index}
            className={isActive(index)}
            key={index}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {images.map((img, index) => (
          <div key={index} className={`carousel-item ${isActive(index)}`}>
            {img.url.match(/video/i) ? (
              <video
                controls
                src={img.url}
                className="d-block w-100"
                alt={img.url}
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
              />
            ) : (
              <img
                src={img.url}
                className="d-block w-100"
                alt={img.url}
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
              />
            )}
          </div>
        ))}
      </div>
      <a
        className="carousel-control-prev"
        role="button"
        href={`#image${id}`}
        data-bs-slide="prev"
        style={{ width: "5%" }}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        role="button"
        href={`#image${id}`}
        data-bs-slide="next"
        style={{ width: "5%" }}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </a>
    </div>
  );
};

export default Carousel;
