<?php
include('config.php');

if (isset($_GET['p'])) {$p=$_GET['p'];} else {$p='1';}
$patron = __DIR__ . '/html/paginas/prueba-{p}.html';
$archivo = str_replace('{p}', $p, $patron);
if (file_exists($archivo)==false) {
    $archivo = str_replace('{p}', '1', $patron);
}
no_cache();
if (file_exists($archivo)) {
    $texto = file_get_contents($archivo);
    $texto = incluir_archivos($texto);
    echo reemplazar_textos($texto);
}
?>