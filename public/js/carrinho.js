function atualizarTotal() {
    const itens = document.querySelectorAll(".item");
    let total = 0;

    itens.forEach(item => {
        const preco = parseFloat(item.querySelector(".item-preco").dataset.preco);
        const quantidade = parseInt(item.querySelector("input[type=number]").value);
        if(item.querySelector("input[type=checkbox]").checked){
            total += preco * quantidade;
        }
    });

    document.getElementById("total-geral").innerText = "R$ " + total.toFixed(2);
}

function alterarQuantidade(btn, delta) {
    const input = btn.parentElement.querySelector("input[type=number]");
    let valor = parseInt(input.value) + delta;
    if(valor < 1) valor = 1;
    input.value = valor;
    atualizarTotal();
}

function removerItem(btn) {
    btn.parentElement.remove();
    atualizarTotal();
}

function finalizarCompra() {
    const total = document.getElementById("total-geral").innerText;
    localStorage.setItem("totalCompra", total);
    window.location.href = "finalizar.html";
}


window.onload = atualizarTotal;
