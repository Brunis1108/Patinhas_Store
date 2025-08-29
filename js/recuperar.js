const formRecuperar = document.getElementById("formRecuperacao");
const emailInput = document.getElementById("emailRecuperacao");

formRecuperar.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    if (!email) {
        alert("❌ Por favor, digite um e-mail válido!");
        return;
    }

    let usuario = JSON.parse(localStorage.getItem("usuario")); // 🔴 depois trocar para fetch()

    if(usuario && usuario.email === email){
        alert(`✅ Email de recuperação enviado! Sua senha é: ${usuario.senha}`);
    } else {
        alert("❌ E-mail não encontrado.");
    }

    emailInput.value = "";
});
