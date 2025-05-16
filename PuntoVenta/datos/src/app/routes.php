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
    $api->group('/artefacto',function(RouteCollectorProxy $endpoint){
        $endpoint->get('/read[/{id}]',Artefacto::class .':read');//leer
        $endpoint->post('',Artefacto::class.':create'); //crear
        $endpoint->put('/{id}',Artefacto::class . ':update');//actualizar
        $endpoint->delete('/{id}',Artefacto::class . ':delete');//eliminar
        $endpoint->get('/filtrar/{pag}/{lim}',Artefacto::class . ':filtrar'); //filtrar
    });
});

$app->group('/api',function(RouteCollectorProxy $api){
    $api->group('/cliente',function(RouteCollectorProxy $endpoint){
        $endpoint->get('[/read/{id}]',Cliente::class .':read');//leer
        $endpoint->post('',Cliente::class.':create'); //crear
        $endpoint->put('/{id}',Cliente::class . ':update');//actualizar
        $endpoint->delete('/{id}',Cliente::class . ':delete');//eliminar
        $endpoint->get('/filtrar/{pag}/{lim}',Cliente::class . ':filtrar'); //filtrar
    });
});