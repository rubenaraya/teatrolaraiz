document.addEventListener('DOMContentLoaded', function() {
    var nombre = document.getElementById('nombre');
    var user = nombre.textContent;
    nombre.innerHTML = '<a href="mailto:' + user + '@' + dominio + '">' + user + '@' + dominio + '</a>';
    new WOW().init();
});
