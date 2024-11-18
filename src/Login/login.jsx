//para gerenciar a autenticação do usuario
// src/pages/LoginPage.jsx
//pega o email e a senha do usuario e entrega para a api,caso de sucesso ele armazena o token
//do usuario com autenticação

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext.jsx';
import config from '../config.js';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css'; 
import loginImage from '../assets/login.png.png';
import iconapple from '../assets/iconapple.png';
import icongoogle from '../assets/icongoogle.png';
import iconface from '../assets/iconface.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.baseURL}/users/login`, { email, password });
      login({ token: response.data.token });
      navigate('/');
    } catch (error) {
      alert("Erro: " + error);
      console.error('Erro de login:', error.response.data);
    }
  };

  return (
    <div className={styles["login-container"]}>
      <h1 className={styles["login-heading"]}>Seu melhor espaço aqui!</h1>
      <img src={loginImage} alt="Logo" className={styles["login-logo"]} />
      <form onSubmit={handleLogin} className={styles["login-form"]}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles["login-input"]}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles["login-input"]}
          required
        />
        <button type="submit" className={styles["login-button"]}>
          Login
        </button>
        <p className={styles["login-register-text"]}>
          Não é registrado? <a href="/register">Registre-se agora</a>
        </p>
      </form>
      <hr className={styles["login-divider"]} />
      <p>Ou continuar com</p>
      <div className={styles["login-social-icons"]}>
        <img src={iconapple} alt="Apple" className={styles["login-icon"]} />
        <img src={icongoogle} alt="Google" className={styles["login-icon"]} />
        <img src={iconface} alt="Facebook" className={styles["login-icon"]} />
      </div>
    </div>
  );
};

export default LoginPage;
