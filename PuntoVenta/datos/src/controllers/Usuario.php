<?php
    namespace App\Controllers;
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Psr\Container\ContainerInterface;
    
    use PDO;

    class Usuario extends Autenticar {
        private $container;
        public function __construct(ContainerInterface $c){
            $this->container = $c;
        }

        private function editarUsuario(string $idUsuario, int $rol=-1,string $passw=""){
            $sql = $rol == -1? "CALL passwUsuario(:idUsuario,:passw);":"CALL rolUsuario(:idUsuario,:rol);";
            $con = $this->container->get('base_datos');
            $query = $con->prepare($sql);
            
            $query->bindValue(":idUsuario",$idUsuario,PDO::PARAM_STR);
            if ($passw !="") {
                $query->bindValue(":passw",$passw,PDO::PARAM_STR);
            }else{
                $query->bindValue(":rol",$rol,PDO::PARAM_INT);
            }
            $query->execute();
            $afec = $query->rowCount();
            $query =null;
            $con = null;
            return $afec;
        }

        public function changePassw(Request $request, Response $response, $args){
            $body = json_decode($request->getBody());
            //primero hay que autenticarse 
            if($this->autenticar($args['idUsuario'], $body->passw, true)){
                $passwN = password_hash($body->passwN,PASSWORD_BCRYPT,["cost"=>10]);
                $resp = $this->editarUsuario(idUsuario: $args['idUsuario'],passw: $passwN);
                $status = 200;
            }else{
                $status = 401;    
            }
            return $response->withStatus($status);
        }

        public function resetPassw(Request $request, Response $response, $args){
          //  $body = json_decode($request->getBody());
            $passwN = password_hash($args['idUsuario'],PASSWORD_BCRYPT,["cost"=>10]);
            $resp = $this->editarUsuario(idUsuario: $args['idUsuario'], passw: $passwN);
            $status = 200;
            //status es 403
            return $response->withStatus($status);
        }

        public function changeRol(Request $request, Response $response, $args){
            $body = json_decode($request->getBody());
            $resp = $this->editarUsuario(idUsuario: $args['idUsuario'],rol: $body->rol);
            $status = 200;
            //status es 403
            return $response->withStatus($status);
        }





    }