//para gerenciar a autenticação do usuario
// src/pages/LoginPage.jsx
//pega o email e a senha do usuario e entrega para a api,caso de sucesso ele armazena o token
//do usuario com autenticação

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext.jsx';
import config from '../config.js';
import { useNavigate } from 'react-router-dom';
import './app.css';
import loginImage from '../assets/login.png.png'; 
//import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
import iconapple from '../assets/iconapple.png';
import icongoogle from '../assets/iconface.png';
import iconface from '../assets/icongoogle.png';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); //armazena o token do usuario após login bem sucedido 
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`${config.baseURL}/users/login`, { email, password });
            login({ token: response.data.token }); // Salva o token
            // Redirecionar ou fazer alguma outra ação após login
            navigate('/');
        } catch (error) {
            alert("erro"+ error);
            console.error('Erro de login:', error.response.data);
        }
    };

    return (
        <div className="login-container">
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>Seu melhor espaço aqui!</h1>
            <img src={loginImage} alt="Logo" className="logo" />
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Senha" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
                <p className="register-text">
                    Não é registrado? <a href="/register">Registre-se agora</a>
                </p>
            </form>
            <hr /> {/* Linha horizontal */}
            <p>Ou continuar com</p>
            <div className="social-icons">
                <img src={iconapple } alt="Logo" className="apple-icon"/>
                <img src={icongoogle}  alt="Logo" className="google-icon"/>
                <img src={iconface} alt="Logo" className="facebook-icon" />
            </div>
        </div>
    );
};

export default LoginPage;