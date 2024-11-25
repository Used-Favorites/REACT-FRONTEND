import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente PrivateRoute para verificar se o usuário está logado
const PrivateRoute = ({ userID, children }) => {
  // Se o usuário não estiver logado, redireciona para o login
  if (!userID) {
    return <Navigate to="/login" />;
  }

  // Caso contrário, renderiza os filhos da rota privada
  return children;
};

export default PrivateRoute;
