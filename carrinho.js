function atualizarTotais() {
    let total = 0;
    document.querySelectorAll('.item').forEach(item => {
        if (item.querySelector('input[type=checkbox]').checked) {
            let preco = parseFloat(item.querySelector('.item-preco').dataset.preco);
            let qtd = parseInt(item.querySelector('input[type=number]').value);
            total += preco * qtd;
        }
    });
    document.getElementById('total-produtos').textContent = "R$ " + total.toFixed(2).replace('.', ',');

    document.getElementById('total-geral').textContent = "R$ " + (total).toFixed(2).replace('.', ',');
}

function alterarQuantidade(btn, delta) {
    let input = btn.parentNode.querySelector('input');
    let novaQtd = parseInt(input.value) + delta;
    if (novaQtd >= 1) {
        input.value = novaQtd;
        atualizarTotais();
    }
}

function removerItem(btn) {
    btn.parentNode.remove();
    atualizarTotais();
}

function finalizarCompra() {

    const itens = [];
    document.querySelectorAll(".item").forEach(item => {
        const nome = item.querySelector(".item-info").innerText.split("\n")[0];
        const preco = parseFloat(item.querySelector(".item-preco").dataset.preco);
        const qtd = parseInt(item.querySelector("input[type=number]").value);
        itens.push({ nome, preco, qtd });
    });

    localStorage.setItem("carrinho", JSON.stringify(itens));

    window.location.href = "finalizar.html";
}


document.querySelectorAll('input').forEach(el => {
    el.addEventListener('change', atualizarTotais);
});

atualizarTotais();
