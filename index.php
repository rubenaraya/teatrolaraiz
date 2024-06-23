<?php
include('config.php');
$archivo = __DIR__ . '/html/inicio.html';

header('Expires: Sat, 14 May 2016 20:00:00 GMT');
header('Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
header('Pragma: no-cache');
header('Content-Type: text/html; charset=utf-8');

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
    $texto = str_replace('{uuid}', uniqid(), $texto);
	echo $texto;
}
?>