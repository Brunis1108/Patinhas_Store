window.addEventListener('DOMContentLoaded', () => {
    const total = localStorage.getItem('totalCompra');
    if(total){
        document.getElementById('valor-total').innerText = total;
    }
});

const form = document.getElementById('form-compra');

form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    alert('Compra finalizada com sucesso! Obrigado pela preferência.');

    form.reset();

});

