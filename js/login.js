const formLogin = document.getElementById("form-login");

formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert(data.message); // ✅ Mensagem de sucesso
            window.location.href = "index.html"; // Redireciona
        } else {
            alert(data.message); // ❌ Mensagem de erro
        }
    })
    .catch(err => {
        console.error("Erro ao fazer login:", err);
        alert("❌ Ocorreu um erro. Tente novamente mais tarde.");
    });
});
