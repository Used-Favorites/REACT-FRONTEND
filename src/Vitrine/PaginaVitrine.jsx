import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios"; // Certifique-se de que o axios está sendo importado corretamente
import { Link } from "react-router-dom"; // Importar Link do react-router-dom
import "./Vitrine.css"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import config from '../config';  

const Vitrine = () => {
  const [produtosCarregados, setProdutosCarregados] = useState([]);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

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

  return (
    <div className="vitrine-container">
      <div className="carrossel">
        <Slider {...settings}>
          {produtosCarregados.length > 0 ? (
            produtosCarregados.slice(0, 5).map((produto) => (
              <div key={produto.id}>
                <Link to={`/paginaProduto/${produto.id}`}>
                  <img 
                    src={`data:image/jpeg;base64,${produto.image}`} 
                    alt={`Produto ${produto.name}`} 
                    className="carrossel-imagem" 
                  />
                </Link>
              </div>
            ))
          ) : (
            <p>Carregando imagens...</p>
          )}
        </Slider>
      </div>

      <h2 className="titulo">Perfeito para você</h2>

      <div className="grid-imagens">
        {produtosCarregados.length > 0 ? (
          produtosCarregados.slice(0, 8).map((produto) => (
            <div key={produto.id} className="grid-item">
              <Link to={`/paginaProduto/${produto.id}`}>
                <img 
                  src={`data:image/jpeg;base64,${produto.image}`} 
                  alt={`Produto ${produto.name}`} 
                  className="produto-imagem" 
                />
              </Link>
            </div>
          ))
        ) : (
          <p>Carregando produtos...</p> 
        )}
      </div>
    </div>
  );
};

export default Vitrine;
