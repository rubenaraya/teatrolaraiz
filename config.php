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
    'inicio'=>'/web',
);

$bloques = array(
    '_bootstrap'=>'/html/bloques/_bootstrap.html',
    '_ga'=>'/html/bloques/_ga.html',
    '_iconos'=>'/html/bloques/_iconos.html',
    '_simbolos'=>'/html/bloques/_simbolos.html',
    '_nocache'=>'/html/bloques/_nocache.html',
    '_metadatos'=>'/html/bloques/_metadatos.html',
);

function reemplazar_textos($texto) {
    global $textos;
    $texto = str_replace('{uuid}', uniqid(), $texto);
    $texto = str_replace('{año}', date('Y'), $texto);
    foreach ($textos as $clave => $valor) {
        $texto = str_replace( '{'.$clave.'}', $valor, $texto );
    }
    return $texto;
}

function incluir_archivos($texto) {
    global $bloques;
    foreach ($bloques as $clave => $valor) {
        $ruta_archivo = __DIR__ . $valor;
        if (file_exists($ruta_archivo)) {
            $agregar = file_get_contents($ruta_archivo);
            $texto = str_replace( '(('.$clave.'))', $agregar, $texto );
        }
    }
    $directorio = __DIR__ . DIRECTORY_SEPARATOR . "html" . DIRECTORY_SEPARATOR . "areas";
    $archivos = [];
    if ($manejador = opendir($directorio)) {
        while (false !== ($archivo = readdir($manejador))) {
            $rutaCompleta = $directorio . DIRECTORY_SEPARATOR . $archivo;
            if (is_file($rutaCompleta)) {
                $info = pathinfo($rutaCompleta);
                $archivos[$info['filename']] = $rutaCompleta;
            }
        }
        closedir($manejador);
    }
    foreach ($archivos as $clave => $valor) {
        if (file_exists($valor)) {
            $agregar = file_get_contents($valor);
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