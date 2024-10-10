import React, { useState, useEffect } from 'react';
import './Header.css'; 

import logo from '../assets/img_logo.png'; 
import sacola from '../assets/sacola-de-compras.png';
import userIcon from '../assets/user-icon.png'; 
import { Link } from 'react-router-dom';

const Header = ({userName}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Função para alternar o estado do menu suspenso
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(prevState => !prevState);
  };
  
  // Fechar o dropdown se o clique for fora dele
  const handleClickOutside = (e) => {
    if (!e.target.closest('.user-icon')) {
      setShowDropdown(false);
    }
  };

  // Adiciona evento de clique para fechar o dropdown ao clicar fora dele
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
	 
      <nav className="navbar">
        <ul className="left-menu">
          <li className="logo-container">
			
            <Link to="/paginaVitrine"><img src={logo} alt="Logo" className="logo" /></Link>
          </li>
          <li>
            <Link to="/paginaVitrine">Vitrine</Link>
          </li>
          <li>
            <Link to="/Python">YOLO</Link>
          </li>
          <li>
          <Link to="/paginaCadastroProduto">Cadastrar Produto</Link>
        </li>
        </ul>
       
        <ul className="right-menu">
          <li className="right-images">
		  
            <Link to="/carrinho"><img src={sacola} alt="Sacola de compras" /></Link>
			  
          </li>
          <li className="user-icon" onClick={toggleDropdown}>
            <img src={userIcon} alt="Ícone de Usuário" />
            <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
			
              <Link to="/paginaCadastro">Cadastro</Link>
			 
			
              <Link to="/Login">Login</Link>
            </div>
		   
																	
          </li>
          {userName && (
            <li className="user-name">
              Bem-vindo, {userName}
            </li>
          )}
			
        </ul>
			 
					  
									  
								   
				 
			


		   
      </nav>
    </div>
	
  );
}  

export default Header;
