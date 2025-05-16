<?php
namespace App\controllers;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Container\ContainerInterface;
use Slim\Routing\RouteCollectorProxy;

$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write("Hello World!");
    return $response;
});

$app->group('/api',function(RouteCollectorProxy $api){
    $api->group('/artefacto',function(RouteCollectorProxy $artefacto){
        $artefacto->get('/read[/{id}]', Artefacto::class . ':read');
        $artefacto->post('', Artefacto::class .':create');
        $artefacto->put('/{id}', Artefacto::class . ':update');
        $artefacto->delete('/{id}', Artefacto::class . ':delete');
        $artefacto->filtrar('/filtrar/{pag},/{lim}' , Artefacto::class . ':filtrar');
        
    });
});
$app->get('/artefacto', function (Request $request, Response $response, $args) {
    $response->getBody()->write("Accediendo a artefacto");
    return $response;
});