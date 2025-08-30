const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware para receber JSON
app.use(express.json());

// Caminho para o arquivo de usuários
const usuariosPath = path.join(__dirname, 'data', 'usuarios.json');

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota para cadastro de usuário
app.post('/api/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios" });
    }

    // Ler usuários existentes
    let usuarios = [];
    if (fs.existsSync(usuariosPath)) {
        const data = fs.readFileSync(usuariosPath, 'utf8');
        usuarios = JSON.parse(data);
    }

    // Verificar se email já existe
    if (usuarios.find(u => u.email === email)) {
        return res.status(400).json({ success: false, message: "Email já cadastrado" });
    }

    // Criar novo usuário
    const novoUsuario = { id: Date.now(), nome, email, senha };
    usuarios.push(novoUsuario);

    // Salvar no JSON
    fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));

    res.json({ success: true, message: "Usuário cadastrado com sucesso!" });
});

// Rota para login
app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ success: false, message: "Email e senha são obrigatórios" });
    }

    // Ler usuários
    let usuarios = [];
    if (fs.existsSync(usuariosPath)) {
        const data = fs.readFileSync(usuariosPath, 'utf8');
        usuarios = JSON.parse(data);
    }

    console.log("Usuários carregados:", usuarios); // <-- AQUI

    const usuario = usuarios.find(u =>
        u.email.toLowerCase().trim() === email.toLowerCase().trim() &&
        u.senha.trim() === senha.trim()
    );

    if (!usuario) {
        return res.status(401).json({ success: false, message: "Email ou senha incorretos" });
    }

    res.json({ success: true, message: "Login realizado com sucesso!", usuario });
});


// Rota padrão (home)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
