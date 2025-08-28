window.addEventListener('DOMContentLoaded', () => {
    const total = localStorage.getItem('totalCompra');
    if(total){
        document.getElementById('valor-total').innerText = total;
    }
});


