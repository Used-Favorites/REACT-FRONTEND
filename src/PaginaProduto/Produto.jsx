import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from "../Components/Header";
import './produto.css';

const base_URL = "https://b521-2804-14c-4e6-8051-8e0e-54f-2097-5b1.ngrok-free.app";
var ProdutoID =1;
const Produto = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${base_URL}/Product/Products/${ProdutoID}`, {
          headers: {
            "ngrok-skip-browser-warning": "any"
          }
        });
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!productData) {
    return <div>Carregando dados do produto...</div>; // Renderização durante o carregamento
  }

  return (
    <div>
      <Header />

      <div className="product-image">
        {/* Renderizar a imagem se disponível */}
        {productData.image ? (
          <img src={productData.imageURL} alt="Product" />
        ) : (
          <div>Imagem não disponível</div>
        )}
      </div>

      <div className="boxMid">
        <h4>{productData.name}</h4>
        <p>
          R${productData.price} via <img src='/src/assets/pix.png' alt="Pix" />
        </p>
        <div className="cartao">
          <p>Cartão de Crédito</p>
          <p>sem juros</p>
          <p>3xR${(productData.price / 3).toFixed(2)}</p>
        </div>

        <div className="Card">
          <div className="card-header" onClick={toggleExpand}>
            <p>Ficha técnica</p>
            <span className={`arrow ${isExpanded ? 'expanded' : ''}`}></span>
          </div>
          {isExpanded && (
            <div className="card-content">
              <p><strong>Descrição do produto:</strong> {productData.description}</p>
              <p><strong>Descrição do problema:</strong> {productData.problemDescription}</p>
              <p><strong>Descrição do estado de qualidade:</strong> {productData.quality}</p>
            </div>
          )}
        </div>
      </div>

      <button>Comprar</button>

      <div className="BoxEnd">
        <h4>APROVEITE E COMPRE JUNTO</h4>
        <img src='/src/assets/images.png' alt="Imagem 1" />
        <img src='/src/assets/images.png' alt="Imagem 2" />
        <img src='/src/assets/images.png' alt="Imagem 3" />
        <img src='/src/assets/images.png' alt="Imagem 4" />
      </div>
    </div>
  );
}

export default Produto;
