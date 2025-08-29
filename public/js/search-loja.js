
const form = document.getElementById("formBusca");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const q = document.getElementById("inputBusca").value.trim();
  if (q) {
    // Redireciona para loja.html com querystring
    window.location.href = `loja.html?q=${encodeURIComponent(q)}`;
  }
});

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

const q = getQueryParam("q");   // pega o termo da URL
const grid = document.querySelector(".produtos");
const titulo = document.querySelector(".resultado h2");

async function buscar(q) {
  titulo.textContent = `Resultados para "${q}"`;
  const resp = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
  if (!resp.ok) {
    grid.innerHTML = `<p>Erro ao buscar produtos.</p>`;
    return;
  }
  const data = await resp.json();

  grid.innerHTML = "";
  if (!data.results.length) {
    grid.innerHTML = `<p>Nenhum produto encontrado.</p>`;
    return;
  }

  for (const p of data.results) {
    const card = document.createElement("div");
    card.className = "produto";
    const img = (p.imagens && p.imagens[0]) ? p.imagens[0] : "imagens/placeholder.png";
    card.innerHTML = `
      <img src="${img}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <p>R$ ${p.preco.toFixed(2).replace('.', ',')}</p>
      <button class="addCarrinho" data-id="${p.id}">Adicionar ao carrinho</button>
    `;
    grid.appendChild(card);
  }
}

// Só busca se tiver parâmetro q
if (q) {
  buscar(q);
}
