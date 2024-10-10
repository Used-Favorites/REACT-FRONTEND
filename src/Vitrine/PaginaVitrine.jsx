import './Vitrine.css';
import { motion } from 'framer-motion';
import image1 from '../../src/assets/images.png';
import image2 from '../../src/assets/images.png';
import image3 from '../../src/assets/images.png';
import image4 from '../../src/assets/images.png';
import { useState, useEffect, useRef } from 'react';

const images = [image1, image2, image3, image4];

const PaginaVitrine = () => {
  const carousel = useRef();
  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="container vitrine-page">
      <div className="carousel">
        <button className="nav-button" onClick={goToPrevious}>
          &#10094; 
        </button>
        <motion.div
          ref={carousel}
          whileTap={{ cursor: 'grabbing' }}
          className="inner"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          initial={{ x: 0 }}
          animate={{ x: -currentIndex * carousel.current?.offsetWidth || 0 }} 
        >
          {images.map((image, index) => (
            <motion.div className="item" key={index}>
              <img src={image} alt={`Imagem ${index + 1}`} />
            </motion.div>
          ))}
        </motion.div>
        <button className="nav-button" onClick={goToNext}>
          &#10095; 
        </button>
      </div>

      <div className="recommendations">
        <h3>Perfeitos para Você</h3>
        <div className="recommendation-grid">
          {images.map((image, index) => (
            <div className="recommendation-item" key={index}>
              <img src={image} alt={`Recomendação ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaginaVitrine;
