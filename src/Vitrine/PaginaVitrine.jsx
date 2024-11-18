import './Vitrine.css';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import config from '../config';  
import axios from "axios"; 
import { Link } from "react-router-dom";

const Vitrine = () => {
  const carousel = useRef();
  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [produtosCarregados, setProdutosCarregados] = useState([]);

  useEffect(() => {
    const fetchImagesData = async () => {
      try {
        const response = await axios.get(`${config.baseURL}/Product/Products/`, {
          headers: {
            "ngrok-skip-browser-warning": "any"
          }
        });

        // Atualiza o estado com os produtos, incluindo imagem e id
        setProdutosCarregados(response.data || []); 
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    
    fetchImagesData();
  }, []);


  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? produtosCarregados.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === produtosCarregados.length - 1 ? 0 : currentIndex + 1);
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
          {produtosCarregados.map((produto, index) => (
            <motion.div className="item" key={index}>
              <Link to={`/paginaProduto/${produto.id}`}>
                  <img 
                    src={`data:image/jpeg;base64,${produto.image}`} 
                    alt={`Produto ${produto.name}`} 
                    className="carrossel-imagem" 
                  />
                </Link>
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
          {produtosCarregados.map((produto, index) => (
            <div className="recommendation-item" key={index}>
              <Link to={`/paginaProduto/${produto.id}`}>
                <img 
                  src={`data:image/jpeg;base64,${produto.image}`} 
                  alt={`Produto ${produto.name}`} 
                  className="produto-imagem" 
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vitrine;
