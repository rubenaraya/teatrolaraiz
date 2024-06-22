document.addEventListener('DOMContentLoaded', function() {
    var nombre = document.getElementById('nombre');
    var user = nombre.textContent;
    var domain = 'teatrolaraiz.cl';
    nombre.innerHTML = '<a href="mailto:' + user + '@' + domain + '" class="text-dark">' + user + '@' + domain + '</a>';

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.style.visibility = 'visible';
                    entry.target.classList.add('animate__animated');
                    const animationName = entry.target.getAttribute('data-animation');
                    const animationDuration = entry.target.getAttribute('data-duration');
                    const animationDelay = entry.target.getAttribute('data-delay');
                    entry.target.classList.add(`animate__${animationName}`);
                    if (animationDuration) {
                        entry.target.classList.add(`animate__${animationDuration}`);
                    }
                    if (animationDelay) {
                        entry.target.classList.add(`animate__${animationDelay}`);
                    }
                    observer.unobserve(entry.target);
                });
            } else {
                requestAnimationFrame(() => {
                    entry.target.style.visibility = 'hidden';
                });
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });
    document.querySelectorAll('#encabezado, #botonera, #video, #mapa').forEach((el) => {
        observer.observe(el);
    });
});
