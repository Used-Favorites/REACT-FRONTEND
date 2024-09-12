import React from 'react';
import './Header.css'; 

import logo from '../assets/uf-logo.jpg'; 
import coracao from '../assets/contorno-em-forma-de-coracao.png';
import sacola from '../assets/sacola-de-compras.png';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div className="header">
     
      <nav className="navbar">
   
      <ul>
        <li>
        <Link to="/"><img src={logo} alt="Logo" className="logo" /></Link>
        </li>
        <li><div className="right-images">
          
          <Link to="/carrinho"><img src={sacola} alt="Sacola de compras" /></Link>
        </div>
        </li>
        <li>
          <Link to="/paginaCadastro">Login</Link>
        </li>
        <li>
          <Link to="/paginaProduto">Ver Produto</Link>
        </li>
        <li>
          <Link to="/paginaCadastroProduto">Cadastrar Produto</Link>
        </li>
        <li>
          <Link to="/Python">YOLO</Link>
        </li>
      </ul>
    </nav>
    </div>
    
  );
}

export default Header;
