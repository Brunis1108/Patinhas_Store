document.getElementById("form-compra").addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = this.nome.value.trim();
    const telefone = this.telefone.value.trim();
    const endereco = this.endereco.value.trim();
    const cartao = this.cartao.value.trim();
    const validade = this.validade.value.trim();
    const cvv = this.cvv.value.trim();

    if (!nome || !telefone || !endereco) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    if (!telefone.match(/\(\d{2}\) \d{5}-\d{4}/)) {
        alert("Telefone inválido! Use o formato (99) 99999-9999.");
        return;
    }

    if (cartao && (!cartao.match(/^\d{13,16}$/) || !validade.match(/^\d{2}\/\d{2}$/) || !cvv.match(/^\d{3}$/))) {
        alert("Dados do cartão inválidos!");
        return;
    }

    alert("Compra finalizada com sucesso!");
    this.reset();
});

window.onload = function() {
    // Pega os itens do carrinho salvos no localStorage
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let total = 0;

    carrinho.forEach(item => {
        total += item.preco * item.qtd;
    });

    // Atualiza o total no HTML
    document.getElementById("valor-total").textContent = total.toFixed(2).replace(".", ",");
};
