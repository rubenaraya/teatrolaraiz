<?php
$titulo = 'Teatro La Raíz';
$descripcion = 'Teatro de arte dramático';
$keywords = 'Teatro, Miniaturas, Pedagogía, Identidad, Comunidad, Ulalá';
$url = 'https://www.teatrolaraiz.cl/web/';
$ga = 'G-CZ6G1N3EBC';

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
	echo $texto;
}
