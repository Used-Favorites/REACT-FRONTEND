//para gerenciar a autenticação do usuario
// src/pages/LoginPage.jsx
//pega o email e a senha do usuario e entrega para a api,caso de sucesso ele armazena o token
//do usuario com autenticação

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext.jsx';
import config from '../config.js';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <h1>Login</h1>
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
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;