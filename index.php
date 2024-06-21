<?php
$titulo = 'Teatro La Raíz';
$descripcion = 'Teatro de arte dramático';
$keywords = 'Teatro, Miniaturas, Pedagogía, Identidad, Comunidad';
$url = 'https://www.teatrolaraiz.cl/web/';
$ga = 'G-CZ6G1N3EBC';
//$video = 'https://www.youtube.com/embed/CENEKx7yfiU?si=yGwb61ka9ZXrA0DR';
$video = 'https://www.youtube.com/embed/videoseries?si=we4GbApZw28NNazU&list=PLWshe2IHPsMUoJ8SwLhoudf97XClkK86N';
$instagram = 'https://www.instagram.com/teatrolaraiz/';
$youtube = 'http://www.youtube.com/@Teatrolaraiz';
$facebook = 'https://web.facebook.com/Teatrolaraiz/';
$linkedin = 'https://www.linkedin.com/in/teatro-la-raíz-192052274/';
$twitter = 'https://x.com/teatro_la_raiz';
$maps = 'https://maps.app.goo.gl/E53u8Mnu9tjQrGoz8';
$mapa = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.262785797283!2d-70.6711882!3d-33.4424595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c4536b4b783b%3A0x8966fbac9033bf2e!2sGarc%C3%ADa%20Reyes%20243%2C%208350502%20Santiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1718993566149!5m2!1ses-419!2scl';

header( 'Expires: Sat, 14 May 2016 20:00:00 GMT' );
header( 'Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0' );
header( 'Pragma: no-cache' );
header( 'Content-Type: text/html; charset=utf-8' );
$archivo = __DIR__ . '/inicio.html';
if (file_exists($archivo)) {
    $texto = file_get_contents($archivo);
    $texto = str_replace('{titulo}', $titulo, $texto);
    $texto = str_replace('{descripcion}', $descripcion, $texto);
    $texto = str_replace('{url}', $url, $texto);
    $texto = str_replace('{keywords}', $keywords, $texto);
    $texto = str_replace('{ga}', $ga, $texto);
    $texto = str_replace('{video}', $video, $texto);
    $texto = str_replace('{instagram}', $instagram, $texto);
    $texto = str_replace('{facebook}', $facebook, $texto);
    $texto = str_replace('{linkedin}', $linkedin, $texto);
    $texto = str_replace('{youtube}', $youtube, $texto);
    $texto = str_replace('{twitter}', $twitter, $texto);
    $texto = str_replace('{maps}', $maps, $texto);
    $texto = str_replace('{mapa}', $mapa, $texto);
	echo $texto;
}
?>