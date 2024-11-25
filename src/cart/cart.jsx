import axios from 'axios';
import React, { useState, useEffect, useRef} from 'react';
import Header from "../Components/Header";
import config from '../config';

const Carrinho = ({userID}) => {
  const userIdString = String(userID);
  console.log("Carrinho de:"+userIdString);
  const [productData, setProductData] = useState([]);
  const [frete, setFrete] = useState(0);
  
  
  const [total, setTotal] = useState(0);
  const [cepCliente, setCepCliente] = useState('');
  

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        //const response = await axios.get(`${config.baseURL}/user/list/cepid/${userIdString}`, {
          const response = await axios.get(`${config.baseURL}/cart/Carts/${userIdString}`, {
          headers: {
            "ngrok-skip-browser-warning": "any"
          }
        });

        setProductData(response.data.product);

        // Calcula o total inicial
        const initialTotal = response.data.product.reduce((acc, product) => acc + (product.promoPrice || product.price), 0);
        setTotal(initialTotal);

      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    const fetchCep = async () => {
      try {
        const response = await axios.get(`${config.baseURL}/user/list/cepid/${userIdString}`, {
          headers: {
            "ngrok-skip-browser-warning": "any"
          }
        });

        setCepCliente(response.data);
        console.log(response.data);


      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
    fetchCep();
  }, []);

  const handleDelete = async (productIds) => {
    try {
      await axios.delete(`${config.baseURL}/cart/Carts/${userIdString}`, {
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

  const handleFrete = async () => {
    if (!cepCliente) {
      alert("Por favor, insira um CEP válido.");
      return;
    }
  
    const vendedorCep = productData.length > 0 ? productData[0].cepVendedor : null;
  
    if (!vendedorCep) {
      alert("CEP do vendedor não encontrado.");
      return;
    }
  
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${vendedorCep}/json/`);
      const clienteResponse = await axios.get(`https://viacep.com.br/ws/${cepCliente}/json/`);
      
      if (!response.data || !clienteResponse.data) {
        alert("CEP inválido.");
        return;
      }
  
      // Use a API de frete aqui
      const freteResponse = await axios.post('https://api-correios/frete', {
        cepOrigem: vendedorCep,
        cepDestino: cepCliente,
        peso: productData.reduce((acc, product) => acc + parseFloat(product.peso || 0), 0), // Exemplo de peso total
        comprimento: 20, // Ajustar conforme necessário
        altura: 10,
        largura: 15,
      });
  
      setFrete(freteResponse.data.valor);
      alert(`Frete calculado: R$${freteResponse.data.valor}`);
    } catch (error) {
      console.error("Erro ao calcular frete:", error);
      alert("Não foi possível calcular o frete.");
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
              <th>Imagem</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Preço Promo</th>
              <th>Descrição</th>
              <th>Problema</th>
              <th>Qualidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {productData.map(product => (
              <tr key={product.id}>
                <td><img src={`data:image/jpeg;base64,${product.image}`} alt="Produto" style={{ width: "50px", height: "50px" }} /></td>
                <td>{product.name}</td>
                <td>R${product.price.toFixed(2)}</td>
                <td>R${product.promoPrice?.toFixed(2) || "-"}</td>
                <td className="descCarrinho">{product.description}</td>
                <td className="probCarrinho">{product.problemDescription}</td>
                <td>{product.quality}</td>
                <td>
                  <button onClick={() => handleDelete(product.id)}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="freteCupomSection">
        <h4>Calcular Frete</h4>
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={cepCliente}
          onChange={(e) => setCepCliente(e.target.value)}
        />
        <button onClick={handleFrete}>Calcular</button>
        {frete > 0 && <p>Frete: R${frete.toFixed(2)}</p>}

        
      </div>

      <div className="totalSection">
        <h3>Total: R${(total + frete).toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Carrinho;
