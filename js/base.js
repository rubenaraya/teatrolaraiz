//js\base.js

function _ocultarSpinner() {
    const spinner = document.querySelector('#spinner');
    if (spinner) {
        spinner.style.display = 'none';
    }
}

function _mostrarScrollTop() {
    const scroll_top = document.querySelector('#mi_scroll_top');
	window.addEventListener('scroll', function() {
		let scrollDistance = window.scrollY;
		let scrollThreshold = window.innerWidth > 800 ? 500 : 250;
		if (scrollDistance > scrollThreshold) {
			scroll_top.style.display = 'block';
		} else {
			scroll_top.style.display = 'none';
		}
	});
}

function _activarGaleria(nombre) {
	const options = {
		keyboard: true,
		size: 'fullscreen',
		gallery: nombre,
	};
	document.querySelectorAll('.mi_lightbox').forEach((el) => el.addEventListener('click', (e) => {
		e.preventDefault();
		const lightbox = new Lightbox(el, options);
		lightbox.show();
	}));
}

function _mostrarContacto() {
    var nombre = document.querySelector('#contacto');
    var user = nombre.textContent;
    nombre.innerHTML = '<a href="mailto:' + user + '@' + dominio + '">' + user + '@' + dominio + '</a>';
}

/* Adaptado de: Bootstrap Cookie Alert by Wruczek
 * https://github.com/Wruczek/Bootstrap-Cookie-Alert
 * Released under MIT license */
function _escribirCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function _leerCookie(cname) {
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
}
function _comprobarCookie(cname) {
    "use strict";
    var cookieAlert = document.querySelector(".mi_alerta_cookies");
    var acceptCookies = document.querySelector(".mi_aceptar_cookies");
    if (!cookieAlert) {
       return;
    }
	cookieAlert.offsetHeight;
	if (_leerCookie(cname).length == 0) {
		cookieAlert.classList.add("show");
	}
	acceptCookies.addEventListener("click", function () {
		_escribirCookie(cname, "0", 365);
		cookieAlert.classList.remove("show");
		window.dispatchEvent(new Event("cookieAlertAccept"))
	});
}

function volverArriba() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function enviarMensaje() {
	const modal = bootstrap.Modal.getInstance('#formContacto');
	modal.hide();

}

document.addEventListener('DOMContentLoaded', function() {
    new WOW().init();
	_mostrarContacto();
	_ocultarSpinner();
	_activarGaleria('galeria');
	_mostrarScrollTop();
    _comprobarCookie(cookie);
});
