<?php
$textos = array(
    'titulo'=>'Teatro La Raíz',
    'descripcion'=>'Teatro de arte dramático',
    'keywords'=>'Teatro, Miniaturas, Pedagogía, Identidad, Comunidad',
    'url'=>'https://www.teatrolaraiz.cl/web/',
    'dominio'=>'teatrolaraiz.cl',
    'cookie'=>'teatrolaraiz',
    'ga'=>'G-CZ6G1N3EBC',
    'video'=>'https://www.youtube.com/embed/videoseries?si=we4GbApZw28NNazU&list=PLWshe2IHPsMUoJ8SwLhoudf97XClkK86N',
    'instagram'=>'https://www.instagram.com/teatrolaraiz/',
    'youtube'=>'http://www.youtube.com/@Teatrolaraiz',
    'facebook'=>'https://web.facebook.com/Teatrolaraiz/',
    'linkedin'=>'https://www.linkedin.com/in/teatro-la-raíz-192052274/',
    'twitter'=>'https://x.com/teatro_la_raiz',
    'maps'=>'https://maps.app.goo.gl/E53u8Mnu9tjQrGoz8',
    'mapa'=>'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.262785797283!2d-70.6711882!3d-33.4424595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c4536b4b783b%3A0x8966fbac9033bf2e!2sGarc%C3%ADa%20Reyes%20243%2C%208350502%20Santiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1718993566149!5m2!1ses-419!2scl',
    'inicio'=>'prueba.php',
);

$archivos = array(
    'bootstrap'=>'_bootstrap.html',
    'ga'=>'_ga.html',
    'iconos'=>'_iconos.html',
    'simbolos'=>'_simbolos.html',
    'nocache'=>'_nocache.html',
    'metadatos'=>'_metadatos.html',
    'area_auxiliar'=>'area_auxiliar.html',
    'area_tarjetas_ico'=>'area_tarjetas_ico.html',
    'area_tarjetas_img'=>'area_tarjetas_img.html',
    'area_paralaje'=>'area_paralaje.html',
    'area_video'=>'area_video.html',
    'area_mapa'=>'area_mapa.html',
    'area_personas'=>'area_personas.html',
    'area_testimonios'=>'area_testimonios.html',
    'area_etiquetas'=>'area_etiquetas.html',
    'area_galeria'=>'area_galeria.html',
    'area_carrusel'=>'area_carrusel.html',
    'area_acordeon'=>'area_acordeon.html',
    'area_contactar'=>'area_contactar.html',
    'area_menu_h'=>'area_menu_h.html',
    'area_menu_v'=>'area_menu_v.html',
    'area_productos'=>'area_productos.html',
    'area_panel_video'=>'area_panel_video.html',
    'area_panel_diapo'=>'area_panel_diapo.html',
    'area_calendario'=>'area_calendario.html',
    'area_botonera'=>'area_botonera.html',
    'area_encabezado'=>'area_encabezado.html',
    'area_pie'=>'area_pie.html',
    'area_temporal'=>'area_temporal.html',
    'area_cargador'=>'area_cargador.html',
    'area_fondo_video'=>'area_fondo_video.html',
);

function reemplazar_textos($texto) {
    global $textos;
    $texto = str_replace('{uuid}', uniqid(), $texto);
    $texto = str_replace('{año}', date('Y'), $texto);
    foreach ( $textos as $clave => $valor ) {
        $texto = str_replace( '{'.$clave.'}', $valor, $texto );
    }
    return $texto;
}

function incluir_archivos($texto) {
    global $archivos;
    foreach ( $archivos as $clave => $valor ) {
        $ruta_archivo = __DIR__ . '/html//'. $valor;
        if (file_exists($ruta_archivo)) {
            $agregar = file_get_contents($ruta_archivo);
            $texto = str_replace( '(('.$clave.'))', $agregar, $texto );
        }
    }
    return $texto;
}

function no_cache() {
    header('Expires: Sat, 14 May 2016 20:00:00 GMT');
    header('Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
    header('Pragma: no-cache');
    header('Content-Type: text/html; charset=utf-8');
}

?>