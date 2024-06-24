document.addEventListener('DOMContentLoaded', function() {
    var nombre = document.getElementById('contacto');
    var user = nombre.textContent;
    nombre.innerHTML = '<a href="mailto:' + user + '@' + dominio + '">' + user + '@' + dominio + '</a>';
    new WOW().init();
    const spinner = document.querySelector('#spinner');
    if (spinner) {
        spinner.style.display = 'none';
    }
    const scroll_top = document.querySelector('#scroll_top');
    if (scroll_top) {
        scroll_top.style.display = 'block';
    }
    comprobarCookie(cookie);
});

function VolverArriba() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Adaptado de: Bootstrap Cookie Alert by Wruczek
 * https://github.com/Wruczek/Bootstrap-Cookie-Alert
 * Released under MIT license */
function escribirCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
function leerCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
};
function comprobarCookie(cname) {
    "use strict";
    var cookieAlert = document.querySelector(".mi_alerta_cookies");
    var acceptCookies = document.querySelector(".mi_aceptar_cookies");
    if (!cookieAlert) {
       return;
    }
	cookieAlert.offsetHeight;
	if (leerCookie(cname).length == 0) {
		cookieAlert.classList.add("show");
	}
	acceptCookies.addEventListener("click", function () {
		escribirCookie(cname, "0", 365);
		cookieAlert.classList.remove("show");
		window.dispatchEvent(new Event("cookieAlertAccept"))
	});
};

