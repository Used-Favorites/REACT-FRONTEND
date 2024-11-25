import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import React, { useState, useEffect } from 'react';
import './App.css';
import PaginaCadastro from './paginaCadastro/PaginaCadastro';
import Produto from './PaginaProduto/Produto';
import CadastroProduto from './PaginaCadastroProduto/CadastroProduto';
import Python from './Python';
import LoginPage from './Login/login';
import PaginaVitrine from './Vitrine';
import { AuthProvider } from './AuthContext.jsx';
import Carrinho from './cart/cart.jsx';
import PrivateRoute from './Components/privateRoute.jsx';

function App() {
  const [userName, setUserName] = useState(null);
  const [userID, setUserID] = useState(null);

  const handleLogine = (response) => {
    setUserName(response.data.user.name);
    setUserID(response.data.user.id);
    console.log("logou como:" + response.data.user.name + " ID: " + response.data.user.id);
  };

  // Redireciona a página inicial de acordo com o status de login
  const getInitialRoute = () => {
    return userID ? "/PaginaVitrine" : "/login";
  };

  return (
    <AuthProvider>
      <Router>
        <Header userName={userName} userID={userID} />
        <div className="main-content">
          <Routes>
            {/* Página inicial condicionada ao login */}
            <Route path="/" element={<Navigate to={getInitialRoute()} />} />
            
            {/* Rota de login */}
            <Route path="/login" element={<LoginPage onLogin={handleLogine} />} />
            
            {/* Rota protegida da vitrine */}
            <Route
              path="/PaginaVitrine"
              element={
                <PrivateRoute userID={userID}>
                  <PaginaVitrine />
                </PrivateRoute>
              }
            />
            <Route path="/paginaCadastro" element={<PaginaCadastro />} />
            <Route path="/paginaProduto/:id" element={<Produto userID={userID} />} />
            <Route path="/paginaCadastroProduto" element={<CadastroProduto />} />
            
            {/* Rota privada para o YOLO */}
            <Route
              path="/Python"
              element={
                <PrivateRoute userID={userID}>
                  <Python />
                </PrivateRoute>
              }
            />
            <Route
              path="/Cart"
              element={
                <PrivateRoute userID={userID}>
                  <Carrinho userID={userID} />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
