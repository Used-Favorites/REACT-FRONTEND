import React from 'react';
import './Header.css'; 

import logo from '../assets/uf-logo.jpg'; 
import coracao from '../assets/contorno-em-forma-de-coracao.png';
import sacola from '../assets/sacola-de-compras.png';

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="Logo" className="logo" />
      <div className="right-images">
        <img src={coracao} alt="Coração" />
        <img src={sacola} alt="Sacola de compras" />
      </div>
    </div>
  );
}

export default Header;
