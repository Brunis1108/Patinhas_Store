document.getElementById("form-login").addEventListener("submit", function(e){
    e.preventDefault();

    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    let usuario = JSON.parse(localStorage.getItem("usuario")); // 🔴 depois trocar para fetch()

    if(usuario && usuario.email === email && usuario.senha === senha){
        alert("✅ Login realizado com sucesso!");
        window.location.href = "index.html";
    } else {
        alert("❌ Email ou senha incorretos. Tente novamente.");
    }
});
