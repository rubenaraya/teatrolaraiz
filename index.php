<?php
include('config.php');
$archivo = __DIR__ . '/html/inicio.html';

no_cache();
if (file_exists($archivo)) {
    $texto = file_get_contents($archivo);
    $texto = incluir_archivos($texto);
    echo reemplazar_textos($texto);
}
?>