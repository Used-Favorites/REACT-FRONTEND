import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./Vitrine.css"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import image from "../../assets/images.png";

const PaginaVitrine = () => {
  const [isMounted, setIsMounted] = useState(false); 

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true, 
  };
  
  const imagensCarrossel = [image, image, image];
  const imagensProdutos = [image, image, image, image, image, image, image, image];

  return (
    <div className="vitrine-container">
    
      {isMounted && ( 
        <div className="carrossel">
          <Slider {...settings}>
            {imagensCarrossel.map((imagem, index) => (
              <div key={index}>
                <img src={imagem} alt={`Slide ${index + 1}`} className="carrossel-imagem" />
              </div>
            ))}
          </Slider>
        </div>
      )}

    
      <h2 className="titulo">Perfeito para você</h2>

      
      <div className="grid-imagens">
        {imagensProdutos.map((imagem, index) => (
          <div key={index} className="grid-item">
            <img src={imagem} alt={`Produto ${index + 1}`} className="produto-imagem" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaginaVitrine;