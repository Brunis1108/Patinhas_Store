document.getElementById("form-login").addEventListener("submit", function(e){
    e.preventDefault();

    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    // Recupera do localStorage
    let usuario = JSON.parse(localStorage.getItem("usuario"));

    if(usuario && email === usuario.email && senha === usuario.senha){
        alert("✅ Login realizado com sucesso!");
        window.location.href = "index.html"; 
    } else {
        alert("❌ Email ou senha incorretos. Tente novamente.");
    }
});
