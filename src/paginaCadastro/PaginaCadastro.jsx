import React, { useState } from 'react';
import { FaUser , FaLock, FaPhone } from 'react-icons/fa';
import './Cadastro.css';
import axios from 'axios';
import config from '../config';  
import images from '../assets/Innovation-amico.png';

const PaginaCadastro = () => {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [Cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [additionalInfo, setAditionalInfo] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

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
          andreess: {
            street: street,
            number: number,
            city: city,
            state: state,
            cep: Cep,
            additionalInfo: additionalInfo,
          },
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
        <div className='image'>
          <img src={images} alt="Imagem de Cadastro" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="Input-Nome">
            <label>Nome</label>
            <div className="input-container">
              <input
                type="text"
                placeholder="Digite seu nome"
                onChange={(e) => setUsername(e.target.value)}
              />
              <FaUser  className="icon" />
            </div>
          </div>
          <div className="Input-Phone">
            <label>Telefone</label>
            <div className="input-container">
              <input
                type="phone"
                placeholder="Digite seu telefone"
                onChange={(e) => setPhone(e.target.value)}
              />
              <FaPhone className="icon" />
            </div>
          </div>
          <div className="Input-Email">
            <label>Endereço de email</label>
            <div className="input-container">
              <input
                type="email"
                placeholder="Digite seu email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaUser  className="icon" />
            </div>
          </div>
          <div className="Input-Senha">
            <label>Senha</label>
            <div className="input-container">
              <input
                type="password"
                placeholder="Crie uma senha"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="icon" />
            </div>
          </div>
          <div className="Input-Endereço">
            <label>CEP</label>
            <div className="input-container">
              <input
                type="text"
                placeholder="Numero do CEP"
                onChange={(e) => setCep(e.target.value)}
              />
              <FaLock className="icon" />
            </div>
          </div>
          <div className="Input-Endereço">
            <label>Rua</label>
            <div className="input-container">
              <input
                type="text"
                placeholder="Nome da Rua"
                onChange={(e) => setStreet(e.target.value)}
              />
              <FaLock className="icon" />
            </div>
          </div>
          <div className="Input-Endereço">
            <label>Numero</label>
            <div className="input-container">
              <input
                type="text"
                placeholder="Numero"
                onChange={(e) => setNumber(e.target.value)}
              />
              <FaLock className="icon" />
            </div>
          </div>
          <div className="Input-Endereço">
            <label>Complemento</label>
            <div className="input-container">
              <input
                type="text"
                placeholder="Informações adicionais"
                onChange={(e) => setAditionalInfo(e.target.value)}
              />
              <FaLock className="icon" />
            </div>
            </div>
            <div className="Input-Endereço">
            <label>Cidade</label>
            <div className="input-container">
              <input
                type="text"
                placeholder="Nome da Cidade"
                onChange={(e) => setCity(e.target.value)}
              />
              <FaLock className="icon" />
            </div>
            <div className="Input-Endereço">
            <label>Estado</label>
            <div className="input-container">
              <input
                type="text"
                placeholder="Nome do estado"
                onChange={(e) => setState(e.target.value)}
              />
              <FaLock className="icon" />
            </div>

          </div>
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