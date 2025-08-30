const formCadastro = document.getElementById("form-cadastro");

formCadastro.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.querySelector("input[type='text']").value;
    const email = document.querySelector("input[type='email']").value;
    const senha = document.querySelectorAll("input[type='password']")[0].value;
    const confirmar = document.querySelectorAll("input[type='password']")[1].value;

    if (senha !== confirmar) {
        alert("❌ As senhas não coincidem!");
        return;
    }

    fetch("/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert(data.message); // ✅ Mensagem de sucesso
            window.location.href = "login.html";
        } else {
            alert(data.message); // ❌ Email já cadastrado
        }
    })
    .catch(err => {
        console.error("Erro ao cadastrar:", err);
        alert("❌ Ocorreu um erro. Tente novamente mais tarde.");
    });
});
