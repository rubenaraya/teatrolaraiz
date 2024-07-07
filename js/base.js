//js\base.js

class Web {
    constructor() {
		this.sleep = function(ms){
			return new Promise(resolve => setTimeout(resolve, ms));
		};
	}
	// Funciones privadas
	async _esperar(tiempo){
		await this.sleep(tiempo);
	}
	_activarScrollTop() {
		const volver_arriba = document.querySelector('#web-volver-arriba');
		if (volver_arriba) {
			window.addEventListener('scroll', function() {
				let scrollDistance = window.scrollY;
				let scrollThreshold = window.innerWidth > 800 ? 500 : 250;
				if (scrollDistance > scrollThreshold) {
					volver_arriba.style.display = 'block';
				} else {
					volver_arriba.style.display = 'none';
				}
			});
		}
	}
	_activarGaleria(nombre) {
		const options = {
			keyboard: true,
			size: 'fullscreen',
			gallery: nombre,
		};
		document.querySelectorAll('.lightbox').forEach((el) => el.addEventListener('click', (e) => {
			e.preventDefault();
			const lightbox = new Lightbox(el, options);
			if (lightbox) {
				lightbox.show();
			}
		}));
	}
	_activarTooltips() {
		const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
		const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
	}
	_activarMenus() {
		const alternar_menu = document.getElementById('web-alternar-menu');
		const control_menu = document.querySelector('#web-control-menu');
		if (alternar_menu && control_menu) {
			control_menu.addEventListener('click', e => {
				let elemento = e.target;
				let esDesplegable = false;
				while (elemento && elemento !== control_menu) {
					if (elemento.classList.contains('dropdown')) {
						esDesplegable = true;
						break;
					}
					elemento = elemento.parentElement;
				}
				const esVentanaChica = window.innerWidth < 992;
				if (!esDesplegable && esVentanaChica && !alternar_menu.classList.contains('collapsed')) {
					alternar_menu.click();
				}
			});
		}
	}
	_comprobarCookie(nombre) {
		"use strict";
		let alertaCookies = document.querySelector(".web-alerta-cookies");
		let aceptarCookies = document.querySelector(".web-aceptar-cookies");
		if (!alertaCookies) {
			return;
		}
		alertaCookies.offsetHeight;
		if (leerCookie(nombre).length == 0) {
			alertaCookies.classList.add("show");
		}
		aceptarCookies.addEventListener("click", function () {
			escribirCookie(nombre, "0", 365);
			alertaCookies.classList.remove("show");
			window.dispatchEvent(new Event("cookieAlertAccept"))
		});
	}
	_activarContacto(dominio) {
		const nombre = document.querySelector('#contacto');
		if (nombre) {
			const casilla = nombre.textContent;
			nombre.innerHTML = '<a href="mailto:' + casilla + '@' + dominio + '">' + casilla + '@' + dominio + '</a>';
		}
	}
	async _ocultarCargando() {
		const fondo_cargando = document.getElementById('web-fondo-cargando');
		if (fondo_cargando) {
			await this._esperar(100);
			fondo_cargando.style.display = 'none';
		}
	}
	_animarElementos() {
		const elementos = document.querySelectorAll('.web-animar');
		function animarElemento(event) {
		  const elemento = event.currentTarget;
		  const animacion = elemento.dataset.webAnimacion;
		  if (elemento && animacion) {
			elemento.classList.remove(`${animacion}`);
			elemento.classList.remove(`animated`);
			void elemento.offsetWidth;
			elemento.classList.add(`animated`);
			elemento.classList.add(`${animacion}`);
			elemento.addEventListener('animationend', () => {
				  elemento.classList.remove(`${animacion}`);
				  elemento.classList.remove(`animated`);
			  }, { once: true });
		  }
		}
		elementos.forEach(elemento => {
		  elemento.addEventListener('click', animarElemento);
		});
	}

	// Funciones públicas
	volverArriba() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	mostrarNotificacion(mensaje='', tipo='success', selector='#web-notificacion') {
		const notificacion = document.querySelector(selector);
		const contenedor = document.querySelector('#web-notificacion .web-mensaje');
		if (notificacion && contenedor) {
			notificacion.classList.remove('text-bg-success');
			notificacion.classList.remove('text-bg-danger');
			notificacion.classList.remove('text-bg-warning');
			notificacion.classList.remove('text-bg-info');
			notificacion.classList.add(`text-bg-${tipo}`);
			contenedor.innerHTML = mensaje;
			const toast = bootstrap.Toast.getOrCreateInstance(notificacion)
			toast.show();
		}
	}
    abrirUrl(url, destino='') {
        if (!/^https?:\/\//i.test(url)) {
            url = `https://${url}`;
        }
        destino ? window.open(url, destino) : window.location.href = url;
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
		this.mostrarNotificacion(mensaje, tipo);
	}
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
    //W._comprobarCookie(cookie);
	W._activarContacto(dominio);
	W._activarGaleria(galeria);
	W._activarTooltips();
	W._activarMenus();
	W._activarScrollTop();
	W._animarElementos();
	new WOW().init();
	W._ocultarCargando();
});
