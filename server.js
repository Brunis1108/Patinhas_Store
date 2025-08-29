const express = require('express');
const path = require('path');
const fs = require('fs/promises');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));


const norm = s => (s || '')
  .toLowerCase()
  .normalize('NFD')
  .replace(/\p{Diacritic}/gu, '');

async function loadProdutos() {
  const raw = await fs.readFile(
    path.join(__dirname, 'public', 'data', 'produtos.json'),
    'utf-8'
  );
  const json = JSON.parse(raw);
  return Array.isArray(json) ? json : (json.produtos || []);
}

function score(prod, termos) {
  const nome  = norm(prod.nome || prod.titulo);
  const desc  = norm(prod.descricao);
  const cat   = norm(prod.categoria);
  const marca = norm(prod.marca);
  const tags  = Array.isArray(prod.tags) ? norm(prod.tags.join(' ')) : norm(prod.tags);

  let s = 0;
  for (const t of termos) {
    if (nome.includes(t))  s += 5;
    if (cat.includes(t))   s += 3;
    if (tags.includes(t))  s += 3;
    if (marca.includes(t)) s += 2;
    if (desc.includes(t))  s += 1;
  }
  const allMatch = termos.every(t =>
    nome.includes(t) || cat.includes(t) || tags.includes(t) || marca.includes(t) || desc.includes(t)
  );
  return allMatch ? s : 0;
}

app.get('/api/search', async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    console.log('GET /api/search q=', q);
    const produtos = await loadProdutos();

    if (!q) return res.json({ results: produtos });

    const termos = norm(q).split(/\s+/).filter(Boolean);
    const results = produtos
      .map(p => ({ ...p, _score: score(p, termos) }))
      .filter(p => p._score > 0)
      .sort((a, b) => b._score - a._score);

    res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Falha na busca' });
  }
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/loja.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'loja.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
