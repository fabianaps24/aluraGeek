async function listaProdutos() {
  const conexao = await fetch("/api/produtos");
  const conecaoConvertida = await conexao.json();
  return conecaoConvertida;
}

async function criaProdudo(nome, imagem, valor) {
  const conexao = await fetch("/api/produtos", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      nome: nome,
      imagem: imagem,
      valor: `R$${valor},00`,
    }),
  });
  const conecaoConvertida = await conexao.json();
  return conecaoConvertida;
}

export const conectaApi = {
  listaProdutos,
  criaProdudo,
};
