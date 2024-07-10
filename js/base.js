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
			galeria.addEventListener('click', (event) => {
				const target = event.target.closest('.mi-lightbox');
				if (target) {
					event.preventDefault();
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
		document.addEventListener('click', event => {
			const dentroDeMenu = event.target.closest('#web-control-menu');
			const esDesplegable = event.target.closest('.dropdown');
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
	#cargarMenu(idMenu, items, keyValor, keyIcono) {
		const menu = document.getElementById(idMenu);
		if (!menu) return;
		items.forEach(item => {
			let elementoMenu;
			if (keyIcono) {
				if (item.href.length == 0) {
					elementoMenu = `<hr class="dropdown-divider">`;
				} else {
					elementoMenu = `<a class="dropdown-item web-item-submenu" href="${item[keyValor]}"><i class="${item[keyIcono]}"></i> ${item.etiqueta}</a>`;
				}
			} else if (item.etiqueta) {
				elementoMenu = `<a class="dropdown-item web-item-submenu" href="#" data-${keyValor}="${item[keyValor]}">${item.etiqueta}</a>`;
			} else if (item.color) {
				elementoMenu = `<button type="button" class="web-btn-tema" data-bs-theme-value="${item.color}" aria-pressed="false" onclick="A.seleccionarTema('${item.color}')"><svg style="color:var(--bs-${item.color})" class="web-simbolo mx-1"><use href="#palette-fill"></use></svg><svg class="web-simbolo ms-auto d-none"><use href="#check2"></use></svg></button>`;
			}
			menu.innerHTML += elementoMenu;
		});
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
	async cargarMenus(ruta) {
		await fetch(ruta)
		.then(response => response.json())
		.then(data => {
			this.#cargarMenu('elegirPagina', data.paginas, 'href', 'icono');
			this.#cargarMenu('elegirTema', data.temas, 'color');
			this.#cargarMenu('elegirFuente', data.fuentes, 'font');
		});
	}
	iniciar(dominio, galeria, menu) {
		this.cargarMenus(menu);
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

class Ajustes {
    constructor() {
        this.defaultTheme = 'light';
		this.iniciar();
    }
    iniciar() {
        this.aplicarTema(this.#obtenerTemaGuardado());
        this.aplicarFuente(this.#obtenerFuenteGuardada());
        this.#registrarEventosUI();
    }
    aplicarTema(tema) {
        document.documentElement.setAttribute('data-bs-theme', tema);
        this.#mostrarTemaActivo(tema);
    }
	seleccionarTema(tema) {
		this.#guardarTema(tema);
		this.aplicarTema(tema);
	}
    aplicarFuente(fuente) {
		if (fuente) {
			document.body.style.fontFamily = fuente;
			this.#marcarFuenteActiva(fuente);
		}
    }
    #obtenerAjustesGuardados() {
        const settings = localStorage.getItem('userSettings');
        return settings ? JSON.parse(settings) : {};
    }
    #guardarAjuste(clave, valor) {
        const settings = this.#obtenerAjustesGuardados();
        settings[clave] = valor;
        localStorage.setItem('userSettings', JSON.stringify(settings));
    }
    #obtenerTemaGuardado() {
        const settings = this.#obtenerAjustesGuardados();
        return settings.theme || this.defaultTheme;
    }
    #guardarTema(tema) {
        this.#guardarAjuste('theme', tema);
    }
    #obtenerFuenteGuardada() {
        const settings = this.#obtenerAjustesGuardados();
        return settings.font || null;
    }
    #guardarFuente(fuente) {
        this.#guardarAjuste('font', fuente);
    }
	#registrarEventosUI() {
		document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
			toggle.addEventListener('click', () => {
				const tema = toggle.getAttribute('data-bs-theme-value');
				this.#guardarTema(tema);
				this.aplicarTema(tema);
			});
		});
		document.querySelector('#elegirFuente').addEventListener('click', event => {
			const target = event.target.closest('[data-font]');
			if (target) {
				const nuevaFuente = target.dataset.font;
				this.#guardarFuente(nuevaFuente);
				this.aplicarFuente(nuevaFuente);
			}
		});
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            this.aplicarTema(this.#obtenerTemaGuardado());
        });
    }
	#mostrarTemaActivo(tema) {
		const themeSwitcher = document.querySelector('#bd-theme');
		if (!themeSwitcher) {
			return;
		}
		const themeSwitcherText = document.querySelector('#bd-theme-text');
		const activeThemeIcon = document.querySelector('.theme-icon-active use');
		const btnToActive = document.querySelector(`[data-bs-theme-value="${tema}"]`);
		if (!btnToActive) return;
		const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href');
		document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
			element.classList.remove('active');
			element.setAttribute('aria-pressed', 'false');
		});
		btnToActive.classList.add('active');
		btnToActive.setAttribute('aria-pressed', 'true');
		activeThemeIcon.setAttribute('href', svgOfActiveBtn);
		const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
		themeSwitcher.setAttribute('aria-label', themeSwitcherLabel);
	}
	#marcarFuenteActiva(fuente) {
		document.querySelectorAll('#elegirFuente .dropdown-item').forEach(item => {
			if (item.dataset.font === fuente) {
				item.classList.add('active');
			} else {
				item.classList.remove('active');
			}
		});
	}
}

const W = new Web();
const C = new Cookie();
const A = new Ajustes();

document.addEventListener('DOMContentLoaded', function() {
	C.comprobarCookie(cookie);
	W.iniciar(dominio, galeria, '/web/html/menu.json');
	W.animarElementos('.web-animar');
	new WOW().init();
	W.ocultarCargando();
});
