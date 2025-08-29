(() => {
  if (window.__SEARCH_LOJA_ATTACHED__) return;
  window.__SEARCH_LOJA_ATTACHED__ = true;

  const form = document.getElementById("formBusca");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = document.getElementById("inputBusca")?.value.trim() || "";
      window.location.href = q ? `/loja.html?q=${encodeURIComponent(q)}` : `/loja.html`;
    });
  }

  const grid = document.getElementById("gridLoja");
  if (!grid) return;

  const titulo = document.querySelector(".resultado h2");

  const IMAGE_BASE = "/imagens/";

  function resolveImg(p) {

    let src = p.imagem || (Array.isArray(p.imagens) ? p.imagens[0] : "");

    if (!src) return "/imagens/placeholder.png";


    if (/^https?:\/\//.test(src)) return src;

    src = src.replace(/^(\.\.\/)+/, "");

    if (src.startsWith("/")) return encodeURI(src);


    if (src.startsWith("imagens/")) return encodeURI("/" + src);

    return encodeURI(IMAGE_BASE + src);
  }

  const norm = (s) =>
    (s || "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

  function score(prod, termos) {
    const nome = norm(prod.nome || prod.titulo);
    const desc = norm(prod.descricao);
    const cat = norm(prod.categoria);
    const marca = norm(prod.marca);
    const tags = Array.isArray(prod.tags) ? norm(prod.tags.join(" ")) : norm(prod.tags);

    let s = 0;
    for (const t of termos) {
      if (nome.includes(t)) s += 5;
      if (cat.includes(t)) s += 3;
      if (tags.includes(t)) s += 3;
      if (marca.includes(t)) s += 2;
      if (desc.includes(t)) s += 1;
    }
    const allMatch = termos.every(
      (t) => nome.includes(t) || cat.includes(t) || tags.includes(t) || marca.includes(t) || desc.includes(t)
    );
    return allMatch ? s : 0;
  }

  const fmtBRL = (v) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
      .format(Number(v) || 0);

  const cardHTML = (p) => {
    const img = resolveImg(p);
    return `
      <div class="produto">
        <img src="${img}" alt="${p.nome}">
        <h3>${p.nome}</h3>
        <p>${fmtBRL(p.preco)}</p>
        <button class="addCarrinho" data-id="${p.id}">Adicionar ao carrinho</button>
      </div>
    `;
  };

  const getQ = () => new URLSearchParams(location.search).get("q") || "";

  async function getProdutos() {
    const res = await fetch("/data/produtos.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Falha ao carregar produtos.json");
    const base = await res.json();
    return Array.isArray(base) ? base : (base.produtos || []);
  }

  function render(lista) {
    if (!lista?.length) {
      grid.innerHTML = `<p class="sem-resultado">Nenhum produto encontrado.</p>`;
      return;
    }
    grid.innerHTML = lista.map(cardHTML).join("");
  }

  (async () => {
    try {
      const q = getQ();
      const input = document.getElementById("inputBusca");
      if (input && q) input.value = q;
      if (titulo) titulo.textContent = q ? `Resultados para "${q}"` : "Todos os produtos";

      const produtos = await getProdutos();

      if (!q) {
        render(produtos);
        return;
      }

      const termos = norm(q).split(/\s+/).filter(Boolean);
      const filtrados = produtos
        .map((p) => ({ ...p, _score: score(p, termos) }))
        .filter((p) => p._score > 0)
        .sort((a, b) => b._score - a._score);

      render(filtrados);
    } catch (err) {
      console.error(err);
      grid.innerHTML = `<p class="sem-resultado">Erro ao buscar produtos.</p>`;
    }
  })();

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".addCarrinho");
    if (!btn) return;
    const id = btn.dataset.id;
    console.log("Adicionar ao carrinho:", id);
  });
})();
