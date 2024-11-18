
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import './App.css'
import PaginaCadastro from './paginaCadastro/PaginaCadastro'
import Produto from './PaginaProduto/Produto'
import CadastroProduto from './PaginaCadastroProduto/CadastroProduto';
import Python from './Python';
import Chat from './Components/Chat';

function App() {
 

   return (
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
  );
}

export default App;
