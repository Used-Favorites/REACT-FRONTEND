import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from "../Components/Header";
import config from '../config';



const Carrinho = () => {
 var  userID=3;
  
  
  const [productData, setProductData] = useState([]);
  

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${config.baseURL}/cart/Carts/${userID}`, {
          headers: {
            "ngrok-skip-browser-warning": "any"
          }
        });
        
        setProductData(response.data.product);
        

      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

 

  if (!productData) {
    return <div>Não foi possivel carregar carrinho...</div>; 
  }

  const handleDelete = async (productIds) => {
    
    try {
      await axios.delete(`${config.baseURL}/cart/Carts/${userID}`, {
        headers: {
          "ngrok-skip-browser-warning": "any"
        },
        data: { productIds: Array.isArray(productIds) ? productIds : [productIds] }

      });
    
     
      
      alert("Produto(s) removido(s) com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao remover produto(s):", error);
    }
  };


  return (
    <div>
  <Header />

  <div>
    <h3>Visualize seu carrinho</h3>
    <table className="tabelaCarrinho">
      <thead>
        <tr>
         
          <th>Product Name</th>
          <th>Price</th>
          <th>Promo Price</th>
          <th>Description</th>
          <th>Problem Description</th>
          <th>Quality</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {productData.map(product => (          
            <tr key={product.id}>
            <td><img src={`data:image/jpeg;base64,${product.image}`} alt="Product"/></td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.promoPrice}</td>
              <td className="DescCarrinho">{product.description}</td>
              <td className="ProbCarrinho">{product.problemDescription}</td>
              <td>{product.quality}</td>
              <td>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  </div>
</div>
  );
}

export default Carrinho;
