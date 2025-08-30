fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
})
.then(res => res.json())
.then(data => {
    if(data.success){
        alert("✅ Login realizado com sucesso!");
        window.location.href = "index.html";
    } else {
        alert("❌ Email ou senha incorretos. Tente novamente.");
    }
})
.catch(err => {
    console.error("Erro ao fazer login:", err);
    alert("❌ Ocorreu um erro. Tente novamente mais tarde.");
});
