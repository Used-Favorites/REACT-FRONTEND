import React, { useState, useEffect } from 'react';
import './produto.css';
import axios from 'axios';
import config from '../config';  

const CadastroProduto = (userID) => {
  const [nomeProduto, setNomeProduto] = useState('');
  const [preco, setPreco] = useState('');
  const [precoPromocao, setPrecoPromocao] = useState('');
  const [descricaoProduto, setDescricaoProduto] = useState('');
  const [descricaoProblema, setDescricaoProblema] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagemSalva, setImagemSalva] = useState('');
  const [Tamanho, setTamanho] = useState('');
  const [Marca, setMarca] = useState('');
  const [Modelo, setModelo] = useState('');
  const [estadoQualidade, setEstadoQualidade] = useState('');
  const [categoriaID, setCategoriaID] = useState(null);
  const [Categorias, setCategoryData] = useState([]);
  

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`${config.baseURL}/Category/categories`, {
          headers: {
            "ngrok-skip-browser-warning": "any"
          }
        });
        setCategoryData(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategoryData();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lida com a conversão da imagem para Base64
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.split(',')[1];
        setImagemSalva(base64String);

        // Chama a API após a conversão da imagem
        await submitProduct(base64String);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // Se não houver arquivo, chama a API sem a imagem
      await submitProduct(null);
    }
  };

  const submitProduct = async (base64Image) => {
    try {
      const uploadResponse = await axios.post(
        `${config.baseURL}/product/Products/`,  
        {
          name: nomeProduto,
          price: parseFloat(preco.replace(',', '.')),
          promoPrice: parseFloat(precoPromocao.replace(',', '.')),  
          description: descricaoProduto,
          problemDescription: descricaoProblema,
          quality: estadoQualidade,
          image:imagemSalva,
          size: parseFloat(Tamanho.replace(',', '.')),
          salePrice: parseFloat(preco.replace(',', '.')),
          repairCost: 0,
          finalPrice: parseFloat(preco.replace(',', '.')),
          repaired: false,
          lastModified: new Date(),
          interestedParties: 1,
          brand: Marca,
          model: Modelo,
          condition: estadoQualidade,
          supplierId: 1
          
        },
        {
          headers: {
            'ngrok-skip-browser-warning': 'any',
            'Content-Type': 'application/json',
          },
        }
      );
   
      if (uploadResponse.status === 201) {
        
        
        updateProduct(uploadResponse.data.id);
        
      } else {
        alert('Não foi possível cadastrar o produto');
      }
    } catch (error) {
      
      alert('Erro ao cadastrar o produto :: ' + error.message);
    }
  };
  const updateProduct = async (idNovo) => {
    try{
    const uploadResponse = await axios.put(
      `${config.baseURL}/product/Products/${idNovo}`,{
        sellerId: parseInt(userID ? userID:1),
        categoryId: parseInt(categoriaID)
       
      },{
        headers: {
          'ngrok-skip-browser-warning': 'any',
          'Content-Type': 'application/json',
        },
      }
    );
    if (uploadResponse.status === 200) {
      alert(`Produto ${uploadResponse.data.id} cadastrado com sucesso`);
      
    } 
  } 
  catch (error) {
    if (error.response) {
        console.error('Data:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
    } else {
        console.error('Error Message:', error.message);
    }
    alert('Erro ao atualizar o produto: ' + error.message);
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
          <label>Imagem</label>
          <input type="file" accept="image/jpeg" onChange={handleFileChange} />
        </div>

        <div className="input-group">
          <label>Tamanho</label>
          <input
            type="number"
            step="0.01"  
            placeholder="Digite o tamanho no formato 11.11"
            onChange={(e) => setTamanho(e.target.value)}
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

        <div className="input-group">
          <label>Marca</label>
          <textarea
            placeholder="Nome da marca"
            onChange={(e) => setMarca(e.target.value)}
          ></textarea>
        </div>
        
        <div className="input-group">
          <label>Modelo</label>
          <textarea
            placeholder="Código do modelo"
            onChange={(e) => setModelo(e.target.value)}
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
