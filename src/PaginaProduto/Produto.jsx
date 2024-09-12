import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from '../Components/header';
import './produto.css';

const base_URL = "https://b521-2804-14c-4e6-8051-8e0e-54f-2097-5b1.ngrok-free.app/Product/Products/1";

const Produto = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${base_URL}`, {
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

  return (
    <div>
      <Header />

      <div className="product-image">
        {/* Display product image here if available */}
        {productData && <img src={productData.imageURL} alt="Product" />}
      </div>     

      <div className="boxMid">
        <h4>{productData ? productData.title : 'Loading...'}</h4>
        <p>{productData ? `R$${productData.price} via ` : 'Loading...'} <img src='/src/assets/pix.png' alt="Pix" /></p>
        <div className="cartao">
          <p>Cartão de Crédito</p>
          <p>sem juros</p>
          <p>3xR$333,03</p>
        </div>

        <div className="Card">
          <div className="card-header" onClick={toggleExpand}>
            <p>Ficha técnica</p>
            <span className={`arrow ${isExpanded ? 'expanded' : ''}`}></span>
          </div>
          {isExpanded && (
            <div className="card-content">
              <p><strong>Descrição do produto:</strong> {productData ? productData.description : 'Loading...'}</p>
              <p><strong>Descrição do problema:</strong> {productData ? productData.problemDescription : 'Loading...'}</p>
              <p><strong>Descrição do estado de qualidade:</strong> {productData ? productData.qualityDescription : 'Loading...'}</p>
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
