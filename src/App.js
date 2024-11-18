
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import React, { useState } from 'react';
import './App.css'
import PaginaCadastro from './paginaCadastro/PaginaCadastro'
import Produto from './PaginaProduto/Produto'
import CadastroProduto from './PaginaCadastroProduto/CadastroProduto';
import Python from './Python';
<<<<<<< HEAD
import Chat from './Components/Chat';

=======
import LoginPage from './Login/login';
import PaginaVitrine from './Vitrine';
import { AuthProvider } from './AuthContext.jsx';
>>>>>>> 8018b64c168a9853775b2ffbe141239424acf28c
function App() {
  const [userName, setUserName] = useState(null);
  const [userID, setUserID] = useState(null);
  const handleLogin = (response) => {
    // Supondo que response.data.name tenha o nome do usuário
    setUserName(response.data.name);
    setUserID(response.data.id);
  };
   return (
<<<<<<< HEAD
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
        <Route path="/paginaCadastro" element={<PaginaCadastro />} />
        <Route path="/paginaProduto" element={<Produto />} />
        <Route path="/paginaCadastroProduto" element={<CadastroProduto />} />
        <Route path="/Python" element={<Python />} />
        <Route path="/chat" element={<Chat />} /> 
        </Routes>
      </div>
    </Router>
=======


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
>>>>>>> 8018b64c168a9853775b2ffbe141239424acf28c
  );
}

export default App;
