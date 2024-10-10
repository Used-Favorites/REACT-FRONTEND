
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import React, { useState } from 'react';
import './App.css'
import PaginaCadastro from './paginaCadastro/PaginaCadastro'
import Produto from './PaginaProduto/Produto'
import CadastroProduto from './PaginaCadastroProduto/CadastroProduto';
import Python from './Python';
import LoginPage from './Login/login';
import PaginaVitrine from './Vitrine';
import { AuthProvider } from './AuthContext.jsx';
function App() {
  const [userName, setUserName] = useState(null);
  const [userID, setUserID] = useState(null);
  const handleLogin = (response) => {
    // Supondo que response.data.name tenha o nome do usuário
    setUserName(response.data.name);
    setUserID(response.data.id);
  };
   return (


    <AuthProvider>
      <Router>
      <Header userName={userName} userID={userID}  />
        <div className="main-content">
          <Routes>
          <Route path="/" element={<PaginaVitrine />} />
          <Route path="/PaginaVitrine" element={<PaginaVitrine />} />
          <Route path="/paginaCadastro" element={<PaginaCadastro />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/paginaProduto/:id" element={<Produto />} />
          <Route path="/paginaCadastroProduto" element={<CadastroProduto />} />
          <Route path="/Python" element={<Python />} />
        
          </Routes>
        </div>
      </Router>
    </AuthProvider> 
  );
}

export default App;
