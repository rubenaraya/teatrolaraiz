//js\base.js

class Web {
    constructor() {
    }
	// Funciones privadas
	_ocultarSpinner() {
		const spinner = document.querySelector('#mi_spinner');
		if (spinner) {
			spinner.style.display = 'none';
		}
	}
	_activarScrollTop() {
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
		const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
		const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
	}
	_activarMenus() {
		const mi_alternar_menu = document.getElementById('mi_alternar_menu');
		const menu_navegacion = document.querySelector('#mi_control_menu');
		menu_navegacion.addEventListener('click', e => {
			let elemento = e.target;
			let esDropdown = false;
			while (elemento && elemento !== menu_navegacion) {
				if (elemento.classList.contains('dropdown')) { // || elemento.classList.contains('navbar-toggler')
					esDropdown = true;
					break;
				}
				elemento = elemento.parentElement;
			}
			const esVentanaPequena = window.innerWidth < 992;
			if (!esDropdown && esVentanaPequena && !mi_alternar_menu.classList.contains('collapsed')) {
				mi_alternar_menu.click();
			}
		});
	}
	_comprobarCookie(nombre) {
		"use strict";
		let cookieAlert = document.querySelector(".mi_alerta_cookies");
		let acceptCookies = document.querySelector(".mi_aceptar_cookies");
		if (!cookieAlert) {
			return;
		}
		cookieAlert.offsetHeight;
		if (leerCookie(nombre).length == 0) {
			cookieAlert.classList.add("show");
		}
		acceptCookies.addEventListener("click", function () {
			escribirCookie(nombre, "0", 365);
			cookieAlert.classList.remove("show");
			window.dispatchEvent(new Event("cookieAlertAccept"))
		});
	}
	_activarContacto(dominio) {
		let nombre = document.querySelector('#contacto');
		let user = nombre.textContent;
		nombre.innerHTML = '<a href="mailto:' + user + '@' + dominio + '">' + user + '@' + dominio + '</a>';
	}

	// Funciones públicas
	volverArriba() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	mostrarInformacion(mensaje='', tipo='success', selector='#mi_notificacion') {
		const informacion = document.querySelector(selector);
		const contenedor = document.querySelector('#mi_mensaje');
		if (informacion && contenedor) {
			informacion.classList.remove('text-bg-success');
			informacion.classList.remove('text-bg-danger');
			informacion.classList.remove('text-bg-warning');
			informacion.classList.remove('text-bg-info');
			informacion.classList.add(`text-bg-${tipo}`);
			contenedor.innerHTML = mensaje;
			const toast = bootstrap.Toast.getOrCreateInstance(informacion)
			toast.show();
		}
	}
	enviarMensaje() {
		//TODO: Falta que valide el formulario y que lo envíe al servidor
		const modal = bootstrap.Modal.getInstance('#formContacto');
		const contacto_nombre = document.getElementById('contacto_nombre');
		const contacto_email = document.getElementById('contacto_email');
		const contacto_mensaje = document.getElementById('contacto_mensaje');
		let tipo = 'success';
		let mensaje = 'Tu mensaje fue enviado exitosamente, pronto nos contactaremos contigo';
		if (!contacto_nombre.value || contacto_nombre.value.length == 0) {
			tipo = 'danger';
			mensaje  = 'No fue posible enviar tu mensaje, intenta nuevamente en otro momento';
		}
		modal.hide();
		this.mostrarInformacion(mensaje, tipo);
	}
    abrirUrl(url, destino='') {
        if (!/^https?:\/\//i.test(url)) {
            url = `https://${url}`;
        }
        destino ? window.open(url, destino) : window.location.href = url;
    }

	// Funciones pendientes
	abrirVentana(contenido, selector='mi_ventana') {
	}
	cerrarVentana(selector='mi_ventana') {
	}
	alternarPaneles(ocultar, mostrar) {}

}

/* Adaptado de: Bootstrap Cookie Alert by Wruczek
* https://github.com/Wruczek/Bootstrap-Cookie-Alert
* Released under MIT license */
function escribirCookie(cname, cvalue, exdays) {
	let d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function leerCookie(cname) {
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

const W = new Web();

document.addEventListener('DOMContentLoaded', function() {
    new WOW().init();
	W._ocultarSpinner();
    W._comprobarCookie(cookie);
	W._activarContacto(dominio);
	W._activarGaleria('galeria');
	W._activarTooltips();
	W._activarMenus();
	W._activarScrollTop();
});
