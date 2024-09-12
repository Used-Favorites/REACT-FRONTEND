import React, { useState } from 'react';
import { FaUser, FaLock, FaPhone } from 'react-icons/fa';
import './Cadastro.css';
import axios from 'axios';

const PaginaCadastro = () => {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const base_URL = 'https://b521-2804-14c-4e6-8051-8e0e-54f-2097-5b1.ngrok-free.app';

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('Enviando os dados: ' + name + ' - ' + email + ' - ' + password + ' - ' + phone);

    try {
      const uploadResponse = await axios.post(
        `${base_URL}/user/create`,
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

      if (uploadResponse.status === 200) { //Se a resposta do cadastro for positiva
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
        <form onSubmit={handleSubmit}>
          <div>
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
          </div>
          <div className="BoxEnd">
            <p>Já tem cadastro? <a href="#">Entre agora</a></p>
            <label>
              <input type="checkbox" />
              Li e concordo com os <a href="#">Termos e Condições e a Política de Privacidade</a>
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
