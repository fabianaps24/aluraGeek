import { conectaApi } from "./conectaApi.js";

const lista = document.querySelector("[data-lista]");

function constroiProduto(id, nome, imagem, valor) {
  const produto = document.createElement("li");
  produto.className = "card_produto";
  produto.dataset.id = id;
  produto.innerHTML = `<img
    class="produto__imagem" 
    src="${imagem}"
    alt=""
    class="card_img"
/>
<p class="produto_nome">${nome}</p>
<div class="card_produto_preco_div">
    <p class="produto_preco">${valor}</p>
    <img src="/public/assets/icon-lixeira.svg" alt="Deletar" class="delete-button" data-id="${id}" />
</div>`;
  return produto;
}

async function listaProdutos() {
  const listaApi = await conectaApi.listaProdutos();
  listaApi.forEach((element) =>
    lista.appendChild(
      constroiProduto(element.id, element.nome, element.imagem, element.valor)
    )
  );
  adicionarEventListenersDeletar();
}

async function deletarProduto(id) {
  try {
    const response = await fetch(`/api/produtos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Não foi possível deletar o produto");
    }

    alert("Produto deletado com sucesso!");
    // Remova o produto do DOM
    document.querySelector(`.card_produto[data-id="${id}"]`).remove();
  } catch (error) {
    console.error(error);
    alert("Erro ao deletar produto");
  }
}

function adicionarEventListenersDeletar() {
  document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = event.target.getAttribute("data-id");
      deletarProduto(id);
    });
  });
}

listaProdutos();
