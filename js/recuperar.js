// Seleciona elementos
const formRecuperar = document.getElementById("formRecuperacao");
const emailInput = document.getElementById("emailRecuperacao");

// Função para exibir o formulário de recuperação
function mostrarRecuperar() {
    document.querySelector(".recuperar-senha-form").style.display = "block";
}

// Função para voltar para o login
function mostrarLogin() {
    document.querySelector(".recuperar-senha-form").style.display = "none";
}

// Função para "enviar" o e-mail de recuperação
function enviarEmailRecuperacao() {
    const email = emailInput.value.trim();

    if (!email) {
        alert("❌ Por favor, digite um e-mail válido!");
        return;
    }

    alert(`✅ Email de recuperação enviado para ${email}!`);

    // Limpa o campo
    emailInput.value = "";

    // volta para login após 2 segundos
    setTimeout(() => {
        mostrarLogin();
    }, 2000);
}

// Adiciona listener no form
formRecuperar.addEventListener("submit", function (e) {
    e.preventDefault(); // impede envio real do form
    enviarEmailRecuperacao();
});
