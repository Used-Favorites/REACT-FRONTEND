import React, { useState, useEffect } from 'react';
import './produto.css';
import axios from 'axios';
import config from '../config';  

const CadastroProduto = () => {
  const [nomeProduto, setNomeProduto] = useState('');
  const [preco, setPreco] = useState('');
  const [precoPromocao, setPrecoPromocao] = useState('');
  const [produtosRelacionados, setProdutosRelacionados] = useState('');
  const [linkVendedor, setLinkVendedor] = useState('');
  const [descricaoProduto, setDescricaoProduto] = useState('');
  const [descricaoProblema, setDescricaoProblema] = useState('');
  const [estadoQualidade, setEstadoQualidade] = useState('');
  const [categoriaID, setCategoriaID] = useState(null);
  const [Categorias, setCategoryData] = useState([]);
  
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`${config.baseURL}Category/categories`, {
          headers: {
            "ngrok-skip-browser-warning": "any"
          }
        });
        setCategoryData(response.data);
        

      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchCategoryData();
  }, []);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(`Enviando dados do Produto: 
      Nome: ${nomeProduto}, 
      Preço: ${preco}, 
      Preço Promocional: ${precoPromocao}, 
      Produtos Relacionados: ${produtosRelacionados}, 
      Link Vendedor: ${linkVendedor}, 
      Descrição: ${descricaoProduto}, 
      Problemas: ${descricaoProblema}, 
      Estado de Qualidade: ${estadoQualidade}`
    );

    try {
      const uploadResponse = await axios.post(
        `${config.baseURL}/product/products`,  
        {
          name: nomeProduto,
          price: parseFloat(preco), 
          promoPrice: parseFloat(precoPromocao),  
          relatedProducts: produtosRelacionados,
          sellerLink: linkVendedor,
          description: descricaoProduto,
          problemDescription: descricaoProblema,
          quality: estadoQualidade,
        },
        {
          headers: {
            'ngrok-skip-browser-warning': 'any',
            'Content-Type': 'application/json',
          },
        }
      );

      if (uploadResponse.status === 200) {
        alert('Produto cadastrado com sucesso');
      } else {
        alert('Não foi possível cadastrar o produto');
      }
    } catch (error) {
      console.error('Erro ao cadastrar o produto:', error);
    }
  };
  
  const handleCategoriaChange = (e) => {
    const categoriaId = e.target.value;
    setCategoriaID(categoriaId);
  };
  return (
    <div className="container-produto">
      <form onSubmit={handleSubmit}>
        <div className="header-produto">
          <h1>Cadastro de Produto</h1>
          <p>Preencha as informações abaixo para cadastrar seu produto</p>
        </div>

        <div className="input-group">
          <label>Nome do Produto</label>
          <input
            type="text"
            placeholder="Digite o nome do produto"
            onChange={(e) => setNomeProduto(e.target.value)}
          />
        </div>

        <div className="input-group">
        <label>Categoria</label>
        <select onChange={handleCategoriaChange} value={categoriaID}>
          <option value="">Selecione uma categoria</option>
          {Categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.name}
            </option>
          ))}
        </select>
        </div>


        <div className="input-group">
          <label>Preço</label>
          <input
            type="number"
            step="0.01"  
            placeholder="Digite o preço"
            onChange={(e) => setPreco(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Preço em Promoção</label>
          <input
            type="number"
            step="0.01"  
            placeholder="Digite o preço promocional"
            onChange={(e) => setPrecoPromocao(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Produtos Relacionados</label>
          <input
            type="text"
            placeholder="Produtos relacionados (opcional)"
            onChange={(e) => setProdutosRelacionados(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Link para o Vendedor</label>
          <input
            type="url"
            placeholder="Cole o link do vendedor"
            onChange={(e) => setLinkVendedor(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Descrição do Produto</label>
          <textarea
            placeholder="Descreva o produto"
            onChange={(e) => setDescricaoProduto(e.target.value)}
          ></textarea>
        </div>

        <div className="input-group">
          <label>Descrições de Problemas</label>
          <textarea
            placeholder="Descreva problemas, se houver"
            onChange={(e) => setDescricaoProblema(e.target.value)}
          ></textarea>
        </div>

        <div className="input-group">
          <label>Descrição do Estado de Qualidade</label>
          <textarea
            placeholder="Descreva o estado de qualidade do produto"
            onChange={(e) => setEstadoQualidade(e.target.value)}
          ></textarea>
        </div>

        <div className="button-produto">
          <button type="submit">Cadastrar Produto</button>
        </div>
      </form>
    </div>
  );
};

export default CadastroProduto;
