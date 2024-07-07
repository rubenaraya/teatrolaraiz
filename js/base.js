//js\base.js

class Web {
    constructor() {
		this.sleep = function(ms){
			return new Promise(resolve => setTimeout(resolve, ms));
		};
	}
	// Funciones privadas
	async #esperar(tiempo){
		await this.sleep(tiempo);
	}
	#activarScrollTop() {
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
	#activarGaleria(nombre) {
		const galeria = document.querySelector('#' + nombre);
		if (galeria) {
			galeria.addEventListener('click', (e) => {
				const target = e.target.closest('.lightbox');
				if (target) {
					e.preventDefault();
					const options = {
						keyboard: true,
						size: 'fullscreen',
						gallery: nombre,
					};
					const lightbox = new Lightbox(target, options);
					lightbox.show();
				}
			});
		}
	}
	#activarTooltips() {
		const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
		const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
	}
	#activarMenus() {
		const alternar_menu = document.getElementById('web-alternar-menu');
		if (!alternar_menu) return;
		document.addEventListener('click', e => {
			const dentroDeMenu = e.target.closest('#web-control-menu');
			const esDesplegable = e.target.closest('.dropdown');
			const esVentanaChica = window.innerWidth < 992;
			if (!esDesplegable && dentroDeMenu && esVentanaChica && !alternar_menu.classList.contains('collapsed')) {
				alternar_menu.click();
			}
		});
	}
	#activarContacto(dominio) {
		const nombre = document.querySelector('#contacto');
		if (nombre) {
			const casilla = nombre.textContent;
			nombre.innerHTML = '<a href="mailto:' + casilla + '@' + dominio + '">' + casilla + '@' + dominio + '</a>';
		}
	}
	#aplicarAnimacion(elemento, animacion) {
		elemento.classList.remove(`${animacion}`, 'animated');
		void elemento.offsetWidth;
		elemento.classList.add('animated', `${animacion}`);
		elemento.addEventListener('animationend', () => {
			elemento.classList.remove('animated', `${animacion}`);
			}, { once: true }
		);
	}
	// Funciones públicas
	async ocultarCargando() {
		const fondo_cargando = document.getElementById('web-fondo-cargando');
		if (fondo_cargando) {
			await this.#esperar(100);
			fondo_cargando.style.display = 'none';
		}
	}
	animarElementos(selector) {
		document.addEventListener('click', (event) => {
			const elemento = event.target.closest(selector);
			if (elemento) {
				const animacion = elemento.dataset.webAnimacion;
				if (animacion) {
					this.#aplicarAnimacion(elemento, animacion);
				}
			}
		});
	}
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
	iniciar(dominio, galeria) {
		this.#activarContacto(dominio);
		this.#activarGaleria(galeria);
		this.#activarTooltips();
		this.#activarMenus();
		this.#activarScrollTop();
	}
}

class Cookie {
	/* Adaptado de: Bootstrap Cookie Alert by Wruczek
	* https://github.com/Wruczek/Bootstrap-Cookie-Alert
	* Released under MIT license */
    constructor() {
        this.cookieAlertSelector = ".web-alerta-cookies";
        this.acceptButtonSelector = ".web-aceptar-cookies";
    }
    comprobarCookie(nombre) {
        "use strict";
        const alertaCookies = document.querySelector(this.cookieAlertSelector);
        const aceptarCookies = document.querySelector(this.acceptButtonSelector);
        if (!alertaCookies) {
            return;
        }
        alertaCookies.offsetHeight;
        if (this.#leerCookie(nombre).length === 0) {
            alertaCookies.classList.add("show");
        }
        aceptarCookies.addEventListener("click", () => {
            this.#escribirCookie(nombre, "0", 365);
            alertaCookies.classList.remove("show");
            window.dispatchEvent(new Event("cookieAlertAccept"));
        });
    }
    // Métodos privados
    #escribirCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = `${cname}=${cvalue};${expires};path=/`;
    }
    #leerCookie(cname) {
        const name = `${cname}=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}

const W = new Web();
const C = new Cookie();

document.addEventListener('DOMContentLoaded', function() {
	C.comprobarCookie(cookie);
	W.iniciar(dominio, galeria);
	W.animarElementos('.web-animar');
	new WOW().init();
	W.ocultarCargando();
});
