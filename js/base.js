document.addEventListener('DOMContentLoaded', function() {
    var nombre = document.getElementById('contacto');
    var user = nombre.textContent;
    nombre.innerHTML = '<a href="mailto:' + user + '@' + dominio + '">' + user + '@' + dominio + '</a>';
    new WOW().init();
    const spinner = document.querySelector('#spinner');
    if (spinner) {
        spinner.style.display = 'none';
    }
});
