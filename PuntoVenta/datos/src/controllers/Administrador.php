<?php
    namespace App\Controllers;
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Psr\Container\ContainerInterface;
   
    use PDO;


    class Administrador{
        protected $container;
      //  private const ROL =4;


        public function __construct(ContainerInterface $c){
            $this->container = $c;
        }


        public function read(Request $request, Response $response, $args){
          $sql = "SELECT * FROM Administrador ";


          if(isset($args["idAdministrador"])){
            $sql.="WHERE idAdministrador=:idAdministrador ";
          }


          $sql.="LIMIT 0, 5";


          $con = $this->container->get('base_datos');
          $query = $con->prepare($sql);
         
          if(isset($args["idAdministrador"])){
            $query->execute(["idAdministrador
            "=>$args["idAdministrador"]]);
          }else{
            $query->execute();
          }
         


          $res = $query->fetchAll();
          $status=$query->rowCount()>0?200:204;
          $query=null;
          $con=null;  


         
          //Obtener un a respuesta
          $response->getBody()->write(json_encode($res));
       
            return $response
            ->withHeader('Content-type','Application/json')
            ->withStatus($status);
        }



       
        public function create(Request $request, Response $response, $args){
            $body = json_decode($request->getBody());
            $sql = "SELECT nuevoAdministrador(:idAdministrador,:nombre,:apellido1,:apellido2,:telefono,:celular,:direccion,:correo);";
            $con =$this->container->get('base_datos');
            $con->beginTransaction();
            $query = $con->prepare($sql);


            foreach($body as $key => $value){
              $TIPO=gettype($value)=='integer'? PDO::PARAM_INT : PDO::PARAM_STR;
              $value = filter_var($value,FILTER_SANITIZE_SPECIAL_CHARS);
              $query->bindValue($key,$value,$TIPO);
            };


            try{
              $query->execute(); //CREA EL ADMINISTRADOR
              //$con->commit();
              $res = $query->fetch(PDO::FETCH_NUM)[0];
              $status = match($res){
                0=>201,
                1=>409
              };
              $id=$body->idAdministrador;
              $sql="SELECT nuevoUsuario(:idUsuario, :rol, :passw);";
              //Hash a la contraseña
              $passw=$id;
              $query=$con->prepare($sql);
              $query->bindValue(":idUsuario",$id,PDO::PARAM_STR);
              $query->bindValue(":rol",self::ROL,PDO::PARAM_INT);
              $query->bindValue(":passw",$passw,PDO::PARAM_STR);


              $query->execute();
              if($status ==409){
                $con->rollback();
              }else{
                $con->commit();
              }
              $res = $query->fetch(PDO::FETCH_NUM)[0];
            }catch(PDOException $e){
              $status=500;
              con->rollback();
            }
            $query=null;
            $con=null;
           return $response->withStatus($status);
        }
