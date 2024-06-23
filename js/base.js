document.addEventListener('DOMContentLoaded', function() {
    var nombre = document.getElementById('nombre');
    var user = nombre.textContent;
    var domain = 'teatrolaraiz.cl';
    nombre.innerHTML = '<a href="mailto:' + user + '@' + domain + '" class="text-body">' + user + '@' + domain + '</a>';
    new WOW().init();
});
