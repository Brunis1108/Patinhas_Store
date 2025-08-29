(function () {
  const GRID_SELECTOR = '#produtosGrid';
  const JSON_URL = '../data/produtos.json'; 
  const PLACEHOLDER = '../imagens/placeholder.png'; 

  const grid = document.querySelector(GRID_SELECTOR);
  if (!grid) return;

  fetch(JSON_URL, { cache: 'no-store' })
    .then(r => {
      if (!r.ok) throw new Error('Falha ao carregar produtos.json');
      return r.json();
    })
    .then(produtos => {
      grid.innerHTML = '';
      produtos.forEach(renderCard);
    })
    .catch(err => {
      console.error(err);
      grid.innerHTML = `
        <div style="padding:16px; text-align:center; color:#666;">
          Não foi possível carregar os produtos agora. Tente novamente mais tarde.
        </div>`;
    });

  function renderCard(p) {
    const card = document.createElement('article');
    card.className = 'produto';
    card.dataset.id = p.id || '';

    const precoBRL = Number(p.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });


    const imgSrc = p.imagem; 

    const thumb = document.createElement('div');
    thumb.className = 'thumb';

    const img = new Image();
    img.loading = 'lazy';
    img.alt = p.nome;
    img.src = imgSrc;

    img.addEventListener('error', function onError() {
      console.warn('Imagem não encontrada:', p.id, imgSrc);
      if (img.dataset.fallbackUsed) return; // impede loop
      img.dataset.fallbackUsed = '1';
      img.src = PLACEHOLDER;
    }, { once: false });

    thumb.appendChild(img);

    card.innerHTML = `
      <h3>${p.nome}</h3>
      <p>${precoBRL}</p>
      <button class="addCarrinho" type="button">Adicionar ao carrinho</button>
    `;

    card.insertBefore(thumb, card.firstChild);

    // Clique do carrinho
    card.querySelector('.addCarrinho').addEventListener('click', () => {
      console.log('Adicionar ao carrinho:', p.id, p.nome);
      // TODO: addToCart(p)
    });

    grid.appendChild(card);
  }
})();
