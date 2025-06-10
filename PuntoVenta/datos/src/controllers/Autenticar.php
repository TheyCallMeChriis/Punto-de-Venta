<?php
    namespace App\Controllers;
    use Psr\Container\ContainerInterface;
    
    use PDO;

    class Autenticar {
        protected $container;
        public function __construct(ContainerInterface $c){
            $this->container = $c;
        }
        private function autenticar($idUsuario, $passw, cambioPassw = false) {
           $sql = "SELECT * FROM usuario WHERE idUsuario = :idUsuario OR correo = :idUsuario;";
           $con = $this->container->get('base_datos');
           $query = $con->prepare($sql);
           $query->bindValue(':idUsuario', $idUsuario, PDO::PARAM_STR);
           $query->execute();
           $datos = $query->fetch();
           if($datos && password_verify($passw, $datos->passw)) {
             $retorno = ["rol" => $datos->rol];    
             $recurso = match($datos->rol) {
                 1 => 'administrador',
                 2 => 'oficinista',
                 3 => 'tecnico',
                 4 => 'cliente',
                 default => null
             };
                $sql = "SELECT nombre from $recurso WHERE id$recurso = idUsuario";
                $sql .= "OR correo = :idUsuario;";
                $query = $con->prepare($sql);
                $query->bindValue(':idUsuario', $datos->idUsuario, PDO::PARAM_STR);
                $query->execute();
                $datos = $query->fetch();
                $retorno['nombre'] = $datos->nombre;

            }
            $query = null;
            $con = null;
            return isset($retorno) ? $retorno : null;
        }
    }