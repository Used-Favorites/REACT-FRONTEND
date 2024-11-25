import React, { useState } from 'react';
import axios from 'axios';

import './python.css'
const Python = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageBase64, setImageBase64] = useState('');
    const [imageOldBase64, setOldImageBase64] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleUpload = async () => {
      if (selectedFile) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result.split(',')[1];
          const base_URL = "https://397f-35-204-246-209.ngrok-free.app";
    
          try {
            setOldImageBase64(base64String);
            setIsLoading(true); // Inicia o carregamento
    
            // Envia a imagem em base64 para o Flask
            const uploadResponse = await axios.post(`${base_URL}/upload_image`, {
              image_base64: base64String
            }, {
              headers: {
                "ngrok-skip-browser-warning": "any",
                "Content-Type": "application/json"
              }
            });
    
            if (uploadResponse.status === 200) {
              // Chama a API para obter a imagem processada
              const response = await axios.get(`${base_URL}/get_image_json`, {
                headers: {
                  "ngrok-skip-browser-warning": "any"
                }
              });
    
              setImageBase64(response.data.image_base64);
            } else {
              console.error("Falha ao receber a imagem da API.");
            }
          } catch (error) {
            console.error('Erro:', error);
          } finally {
            setIsLoading(false); // Finaliza o carregamento
          }
        };
    
        reader.readAsDataURL(selectedFile);
      } else {
        alert('Por favor, selecione um arquivo primeiro.');
      }
    };


    return (
      <div className="YOLO">
        <h1>Uploader</h1>
        <input type="file" accept="image/jpeg" onChange={handleFileChange} />
        <button onClick={handleUpload}>Enviar Imagem</button>

        <div className="images-container">
        {imageOldBase64 && (
        <div>
        <h2>Imagem agora:</h2>
        <img src={`data:image/jpeg;base64,${imageOldBase64}`} alt="Imagem agora" />
        </div>
        )}
        {isLoading && <p>Carregando a imagem processada...</p>}
        {imageBase64 && !isLoading && (
        <div>
        <h2>Imagem pós YOLO:</h2>
        <img src={`data:image/jpeg;base64,${imageBase64}`} alt="Imagem processada" />
        </div>
        )}
        </div>
        <div className="classification-table">
        <h2>Classificações de Problemas: O nome do problema encontrado pela IA e a % que o algoritmo achou que aquilo era</h2>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tradução</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>missing_hole</td>
              <td>Furo ausente</td>
            </tr>
            <tr>
              <td>mouse_bite</td>
              <td>Mordida de rato</td>
            </tr>
            <tr>
              <td>open_circuit</td>
              <td>Circuito aberto</td>
            </tr>
            <tr>
              <td>short</td>
              <td>Curto-circuito</td>
            </tr>
            <tr>
              <td>spur</td>
              <td>Esporão</td>
            </tr>
            <tr>
              <td>spurious_copper</td>
              <td>Cobre espúrio</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    );
}


export default Python;
