const form = document.getElementById("formCadastro");
const msg = document.getElementById("msgSucesso");

form.addEventListener("submit", function(e) {
    e.preventDefault(); // impede envio do form

    const senha = document.getElementById("senha").value;
    const confSenha = document.getElementById("confSenha").value;

    // Verifica se as senhas coincidem
    if (senha !== confSenha) {
        alert("⚠️ As senhas não coincidem. Por favor, digite novamente.");
        return; // Para aqui se as senhas não baterem
    }

    // Se passou na verificação, mostra a mensagem de sucesso
    msg.style.display = "block"; // mostra a mensagem
    form.style.display = "none"; // esconde o formulário

    // Redireciona para login.html depois de 2 segundos
    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);
});
