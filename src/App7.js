import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import './App.css'
import PaginaCadastro from './paginaCadastro/PaginaCadastro'
import Produto from './PaginaProduto/Produto'
import CadastroProduto from './PaginaCadastroProduto/CadastroProduto';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageBase64, setImageBase64] = useState('');
  const [imageOldBase64, setOldImageBase64] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.split(',')[1];
        const base_URL = "https://bfe8-34-90-201-50.ngrok-free.app/";

        try {
            setOldImageBase64(base64String);
          // Envia a imagem em base64 para o Flask
          const uploadResponse = await axios.post(`${base_URL}/upload_image`, {
            image_base64: base64String
          }, {
            headers: {
              "ngrok-skip-browser-warning": "any",
              "Content-Type": "application/json"
            }
          });

        

          // Chama a pagina de resultado(Na qual executa o YOLO de Detecção)
          if (uploadResponse.status === 200) {
                const response = await axios.get(`${base_URL}/get_image_json`, {
              headers: {
                "ngrok-skip-browser-warning": "any"
              }
            });

            setImageBase64(response.data.image_base64);
          } else {
            console.error("Falha de receber a imagem da API.");
          }
        } catch (error) {
          console.error('Erro:', error);
        }
      };

      reader.readAsDataURL(selectedFile);
    } else {
      alert('Por favor, selecione um arquivo primeiro.');
    }
  };

  return (
    
    <div className="App">
       <Router>
      <Header />
      <Routes>
        <Route path="/paginaCadastro" element={<PaginaCadastro />} />
        <Route path="/paginaProduto" element={<Produto />} />
        <Route path="/paginaCadastroProduto" element={<CadastroProduto />} />
      </Routes>
    </Router>
      <h1>Uploader</h1>
      <input type="file" accept="image/jpeg" onChange={handleFileChange} />
      <button onClick={handleUpload}>Enviar Imagem</button>
      
      {imageOldBase64 && (
        
        <div>
          <h2>Imagem agora:</h2>
          <img src={`data:image/jpeg;base64,${imageOldBase64}`} alt="Imagem agora" width="50%" height="40%" />
         
        </div>
      )}  
      {imageBase64 && (
        
        <div>
          <h2>Imagem pós YOLO:</h2>
          <img src={`data:image/jpeg;base64,${imageBase64}`} alt="Imagem processada" width="50%" height="40%" />
         
        </div>
      )}
    </div>
  );
}

export default App;
