
import React, { useState, useEffect } from "react";
import './galleryitem.css';

import aiorigin from '../../assets/03.png'
import aigenerated from '../../assets/03-new.png'

const GalleryItem3 = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    aiorigin,
    aigenerated
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((currentIndex) =>
        currentIndex === 1 ? 0 : currentIndex + 1
      );
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="img-carousel relative">
      {images.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`${index + 1}`}
          style={{ opacity: currentImageIndex === index ? 1 : 0 }}
        />
      ))}
    </div>
  );
};

 export default GalleryItem3;