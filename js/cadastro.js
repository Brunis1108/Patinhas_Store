document.getElementById("form-cadastro").addEventListener("submit", function (e) {
    e.preventDefault();

    let nome = document.querySelector("input[type='text']").value;
    let email = document.querySelector("input[type='email']").value;
    let senha = document.querySelectorAll("input[type='password']")[0].value;
    let confirmar = document.querySelectorAll("input[type='password']")[1].value;

    if (senha !== confirmar) {
        alert("❌ As senhas não coincidem!");
        return;
    }

    let usuario = { nome, email, senha };
    localStorage.setItem("usuario", JSON.stringify(usuario)); // 🔴 depois trocar para fetch()

    document.getElementById("msgSucesso").style.display = "block";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);
});
