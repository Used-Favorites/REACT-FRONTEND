import React, { useState } from 'react';
import './produto.css';

const CadastroProduto = () => {
  const [nomeProduto, setNomeProduto] = useState('');
  const [preco, setPreco] = useState('');
  const [precoPromocao, setPrecoPromocao] = useState('');
  const [produtosRelacionados, setProdutosRelacionados] = useState('');
  const [linkVendedor, setLinkVendedor] = useState('');
  const [descricaoProduto, setDescricaoProduto] = useState('');
  const [descricaoProblema, setDescricaoProblema] = useState('');
  const [estadoQualidade, setEstadoQualidade] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Cadastro de Produto:
      Nome: ${nomeProduto}
      Preço: ${preco}
      Preço Promoção: ${precoPromocao}
      Produtos Relacionados: ${produtosRelacionados}
      Link Vendedor: ${linkVendedor}
      Descrição: ${descricaoProduto}
      Problemas: ${descricaoProblema}
      Estado de Qualidade: ${estadoQualidade}
    `);
  };

  return (
    <div className="container-produto">
      <form onSubmit={handleSubmit}>
        <div className="header-produto">
          <h1>Cadastro de Produto</h1>
          <p>Preencha as informações abaixo para cadastrar seu produto</p>
        </div>

        <div className="input-group">
          <label>Nome do Produto</label>
          <input
            type="text"
            placeholder="Digite o nome do produto"
            onChange={(e) => setNomeProduto(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Espaço para Imagem (Definido, mas não implementado)</label>
          <div className="image-placeholder">Imagem do Produto</div>
        </div>

        <div className="input-group">
          <label>Preço</label>
          <input
            type="number"
            placeholder="Digite o preço"
            onChange={(e) => setPreco(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Preço em Promoção</label>
          <input
            type="number"
            placeholder="Digite o preço promocional"
            onChange={(e) => setPrecoPromocao(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Produtos Relacionados</label>
          <input
            type="text"
            placeholder="Produtos relacionados (opcional)"
            onChange={(e) => setProdutosRelacionados(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Link para o Vendedor</label>
          <input
            type="url"
            placeholder="Cole o link do vendedor"
            onChange={(e) => setLinkVendedor(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Descrição do Produto</label>
          <textarea
            placeholder="Descreva o produto"
            onChange={(e) => setDescricaoProduto(e.target.value)}
          ></textarea>
        </div>

        <div className="input-group">
          <label>Descrições de Problemas</label>
          <textarea
            placeholder="Descreva problemas, se houver"
            onChange={(e) => setDescricaoProblema(e.target.value)}
          ></textarea>
        </div>

        <div className="input-group">
          <label>Descrição do Estado de Qualidade</label>
          <textarea
            placeholder="Descreva o estado de qualidade do produto"
            onChange={(e) => setEstadoQualidade(e.target.value)}
          ></textarea>
        </div>

        <div className="input-group">
          <label>Comentários</label>
          <div className="comments-section">
            <p>Área para comentários (a ser implementada)</p>
          </div>
        </div>

        <div className="button-produto">
          <button type="submit">Cadastrar Produto</button>
        </div>
      </form>
    </div>
  );
};

export default CadastroProduto;
