const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Caminho para o arquivo de usuários
const usuariosPath = path.join(__dirname, "usuarios.json");

app.use(bodyParser.json());
app.use(express.static("public"));

// Rota para cadastrar novo usuário
app.post("/usuarios", (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Preencha todos os campos!" });
  }

  // Lê o arquivo de usuários
  let usuarios = [];
  if (fs.existsSync(usuariosPath)) {
    usuarios = JSON.parse(fs.readFileSync(usuariosPath, "utf-8"));
  }

  // Verifica se o email já existe
  if (usuarios.some((u) => u.email === email)) {
    return res.status(400).json({ error: "E-mail já cadastrado!" });
  }

  // Adiciona o novo usuário
  usuarios.push({ nome, email, senha });

  // Salva no arquivo
  fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));

  res.json({ message: "Usuário cadastrado com sucesso!" });
});

// Rota para listar usuários (só para debug/teste)
app.get("/usuarios", (req, res) => {
  const usuarios = fs.existsSync(usuariosPath)
    ? JSON.parse(fs.readFileSync(usuariosPath, "utf-8"))
    : [];
  res.json(usuarios);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
