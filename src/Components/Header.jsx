import React, { useState, useEffect } from 'react';
import './Header.css'; 
import logo from '../assets/img_logo.png'; 
import sacola from '../assets/sacola-de-compras.png';
import userIcon from '../assets/user-icon.png'; 
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ userName, userID, setUserName, setUserID }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // Hook para navegação programática

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(prevState => !prevState);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest('.user-icon')) {
      setShowDropdown(false);
    }
  };

  // Função para realizar o logout
  const handleLogout = () => {
    // Limpar os dados de login do estado
    setUserName(null);
    setUserID(null);
    
    // Remover os dados do localStorage (se você estiver usando localStorage para persistir)
    localStorage.removeItem('userName');
    localStorage.removeItem('userID');
    
    // Redirecionar para a página de login
    //navigate('/login');
    window.location.reload();
    navigate('/login');
  };

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
          {/* Condicional para exibir o link para a vitrine apenas se o usuário estiver logado */}
          {userID && (
            <li>
              <Link to="/paginaVitrine">Vitrine</Link>
            </li>
          )}
          <li>
            <Link to="/Python">YOLO</Link>
          </li>
          <li>
            {userID && <Link to="/paginaCadastroProduto">Cadastrar Produto</Link>}
          </li>
        </ul>
       
        <ul className="right-menu">
          <li className="right-images">
            {/* Exibe o carrinho apenas se o usuário estiver logado */}
            {userID && <Link to="/Cart"><img src={sacola} alt="Sacola de compras" /></Link>}
          </li>
          <li className="user-icon" onClick={toggleDropdown}>
            <img src={userIcon} alt="Ícone de Usuário" />
            <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
              {!userID ? (
                <>
                  <Link to="/paginaCadastro">Cadastro</Link>
                  <Link to="/login">Login</Link>
                </>
              ) : (
                <>
                  <Link to="/profile">Meu Perfil</Link>
                  <Link to="#" onClick={handleLogout}>Sair</Link> {/* Botão de logout */}
                </>
              )}
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
};

export default Header;
