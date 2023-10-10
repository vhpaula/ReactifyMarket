<h1 align="center">ReactifyMarket</h1>

<br>
<br>

<p align="center">
  <a href="#overview">Visão Geral</a> •
  <a href="#tecnologias">Tecnologias Utilizadas</a> •
  <a href="#funcionalidades">Funcionalidades</a> •
  <a href="#instalação">Instalação</a> •
  <a href="#uso">Como Usar</a> •
  <a href="#layout">Layout</a> •
  <a href="#contribuição">Contribuição</a> •
  <a href="#licença">Licença</a>
</p>

<br>
<br>

<p align="center">
   <img alt="ReactifyMarket Preview" src="./.github/preview.svg" width="100%">
</p>

<br>

<h2 id="overview"> 🚀 Visão Geral </h2>

<br>

O ReactifyMarket é um projeto desenvolvido em ReactJS, utilizando Vite como bundler e TailwindCSS para estilização. Ele consiste em um aplicativo de carrinho de compras, onde os usuários podem visualizar uma lista de produtos obtidos através da API do fakestoreapi.com na rota principal ("/"). Nesta tela, é possível filtrar produtos por categoria, ordenar por código do produto e limitar a quantidade de itens exibidos. Além disso, os usuários podem adicionar um ou mais itens ao carrinho. O carrinho de compras é gerenciado usando o Context API do ReactJS, permitindo atualizações automáticas na barra de cabeçalho ao incluir ou excluir itens.

Os usuários podem clicar no carrinho para acessar a rota "/cart", onde podem visualizar os itens no carrinho, os subtotais por produto e o total dos produtos. Além disso, é possível clicar na imagem ou título do produto para acessar a rota "/product/{ID}" e ver detalhes específicos do produto.

O layout do aplicativo foi criado com base em um design do usuário chamado @kiritgoti, disponível no Figma através do link: [Layout do ReactifyMarket](https://www.figma.com/community/file/1206898292713093171).

<br>
<br>

<h2 id="tecnologias"> 💻 Tecnologias Utilizadas </h2>
<br>

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

-   **ReactJS**: Biblioteca JavaScript para construção de interfaces de usuário.
-   **Vite**: Bundler rápido e moderno para projetos web.
-   **TailwindCSS**: Framework de estilização utilizado para criar o layout do aplicativo.
-   **Context API**: Gerenciamento de estado para o carrinho de compras.

<br>
<br>

<h2 id="funcionalidades"> ⭐ Funcionalidades </h2>

<br>

-   **Rota Principal ("/")**:
    -   Lista de produtos obtidos da API fakestoreapi.com.
    -   Filtros por categoria, ordenação por código do produto e limite de itens exibidos.
    -   Adição de itens ao carrinho de compras.
-   **Rota "/cart"**:
    -   Visualização dos itens no carrinho.
    -   Subtotais por produto e total dos produtos.
-   **Rota "/product/{ID}"**:
    -   Detalhes específicos do produto ao clicar na imagem ou título.
-   **Barra de Cabeçalho**:
    -   Atualizações automáticas do carrinho de compras usando Context API do ReactJS.

<br>
<br>

<h2 id="instalação"> 📦 Instalação </h2>

<br>

Para executar o projeto localmente, siga estas etapas:

1. Clone o repositório: `git clone https://github.com/SEU_USUARIO/ReactifyMarket.git`
2. Acesse a pasta do projeto: `cd ReactifyMarket`
3. Instale as dependências: `npm install` ou `yarn install`
4. Inicie o servidor de desenvolvimento: `npm start` ou `yarn dev`
5. Acesse a aplicação em seu navegador: `http://localhost:3000`

<br>
<br>

<h2 id="uso"> 🔧 Como Usar </h2>

<br>

-   **Filtrar Produtos:**
    -   Na rota principal ("/"), utilize os filtros para encontrar produtos por categoria, ordenar por código do produto e limitar a quantidade de itens exibidos.
-   **Adicionar ao Carrinho:**
    -   Clique no botão de adicionar ao carrinho para incluir produtos no seu carrinho de compras.
-   **Visualizar Carrinho:**
    -   Clique no ícone do carrinho para acessar a rota "/cart" e visualizar os itens no carrinho, os subtotais por produto e o total dos produtos.
-   **Detalhes do Produto:**
    -   Clique na imagem ou título do produto para acessar a rota "/product/{ID}" e ver detalhes específicos do produto.

<br>
<br>

<h2 id="layout"> 🎨 Layout </h2>

<br>

O layout do ReactifyMarket foi criado com base no design do usuário @kiritgoti, disponível no Figma. Você pode acessar o layout e se inspirar aqui: [Layout do ReactifyMarket no Figma](https://www.figma.com/community/file/1206898292713093171/single-product-product-list-page).

<br>
<br>

<h2 id="contribuição"> 🤝 Contribuição  </h2>

<br>

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorar este projeto.

<br>
<br>

<h2 id="licença"> 📄 Licença </h2>

<br>

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

<br>

<hr />

<br>

Feito com ❤️ por [Vitor Henrique](https://github.com/vhpaula)
