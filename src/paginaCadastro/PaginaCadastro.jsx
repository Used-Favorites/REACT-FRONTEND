import React, { useState } from 'react';
import { FaUser, FaLock, FaPhone } from 'react-icons/fa';
import './Cadastro.css';
import axios from 'axios';
import config from '../config';  

const PaginaCadastro = () => {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadResponse = await axios.post(
        `${config.baseURL}/user/create`,  
        {
          name: name,
          email: email,
          password: password,
          phone: phone,
        },
        {
          headers: {
            'ngrok-skip-browser-warning': 'any',
            'Content-Type': 'application/json',
          },
        }
      );

      if (uploadResponse.status === 200) {
        alert('Cadastrado com sucesso');
      } else {
        alert('Não foi possível cadastrar');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="image-container"></div>
        
        <form onSubmit={handleSubmit}>
          <div className="Input-Nome">
            <label>Nome</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="Input-Phone">
            <label>Telefone</label>
            <input
              type="phone"
              placeholder="Digite seu telefone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <FaPhone className="icon" />
          </div>
          <div className="Input-Email">
            <label>Endereço de email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="Input-Senha">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Crie uma senha"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          <div className="BoxEnd">
            <p>Já tem cadastro? <a href="/">Entre agora</a></p>
            <label>
              <input type="checkbox" />
              Li e concordo com os <a href="/">Termos e Condições e a Política de Privacidade</a>
            </label>
          </div>
          <div className="Button">
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaginaCadastro;
