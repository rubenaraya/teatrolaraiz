//js\base.js
class Web {
    constructor(dominio, cookie) {
        this.ELEMENTOS = new Map();
		this.dominio = dominio;
		this.cookie = cookie;
    }
	_ocultarSpinner() {
		const spinner = document.querySelector('#mi_spinner');
		if (spinner) {
			spinner.style.display = 'none';
		}
	}
	_mostrarScrollTop() {
		const scroll_top = document.querySelector('#mi_scroll_top');
		//const menu_base = document.querySelector('#mi_menu_base');
		window.addEventListener('scroll', function() {
			let scrollDistance = window.scrollY;
			let scrollThreshold = window.innerWidth > 800 ? 500 : 250;
			if (scrollDistance > scrollThreshold) {
				scroll_top.style.display = 'block';
				//menu_base.style.display = 'block';
			} else {
				scroll_top.style.display = 'none';
				//menu_base.style.display = 'none';
			}
		});
	}
	_activarGaleria(nombre) {
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
	_activarTooltips() {
	}
	_activarToast() {
		const notificacion = document.querySelector('#mi_notificacion');
		//mi_notificacion
	}
	/* Adaptado de: Bootstrap Cookie Alert by Wruczek
	* https://github.com/Wruczek/Bootstrap-Cookie-Alert
	* Released under MIT license */
	_escribirCookie(cname, cvalue, exdays) {
		let d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		let expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	_leerCookie(cname) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
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
	_comprobarCookie() {
		"use strict";
		let cookieAlert = document.querySelector(".mi_alerta_cookies");
		let acceptCookies = document.querySelector(".mi_aceptar_cookies");
		if (!cookieAlert) {
			return;
		}
		cookieAlert.offsetHeight;
		if (this._leerCookie(this.cookie).length == 0) {
			cookieAlert.classList.add("show");
		}
		acceptCookies.addEventListener("click", function () {
			this._escribirCookie(this.cookie, "0", 365);
			cookieAlert.classList.remove("show");
			window.dispatchEvent(new Event("cookieAlertAccept"))
		});
	}
	_mostrarContacto() {
		let nombre = document.querySelector('#contacto');
		let user = nombre.textContent;
		nombre.innerHTML = '<a href="mailto:' + user + '@' + this.dominio + '">' + user + '@' + this.dominio + '</a>';
	}
	_mostrarNotificacion(mensaje, tipo) {
		
	}
	
	volverArriba() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	enviarMensaje() {
		const modal = bootstrap.Modal.getInstance('#formContacto');
		modal.hide();
	
	}
			
}
const W = new Web(dominio, cookie);

document.addEventListener('DOMContentLoaded', function() {
    new WOW().init();
	W._mostrarContacto();
	W._ocultarSpinner();
	W._activarGaleria('galeria');
	W._activarToast();
	W._activarTooltips();
	W._mostrarScrollTop();
    W._comprobarCookie(cookie);
});
