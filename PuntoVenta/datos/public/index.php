<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-API-KEY, Origen, X-Request-Width, Content-Type, Accept, Access-Control-Request-Method, Authorization');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH');
header('Allow: GET, POST, OPTIONS, PUT, DELETE, PATCH');
/*
if($_SERVER['REMOTE_ADDR'] == "192.168.10.13"){
   die("Acceso denegado desde esta IP");
}
*/   
if($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
}
require "../src/app/app.php";
   