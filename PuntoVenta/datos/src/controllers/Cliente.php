<?php
    namespace App\Controllers;
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Psr\Container\ContainerInterface;
   
    use PDO;


    class Cliente{
        protected $container;
        private const ROL =4;


        public function __construct(ContainerInterface $c){
            $this->container = $c;
        }


        public function read(Request $request, Response $response, $args){
          $sql = "SELECT * FROM Artefacto ";


          if(isset($args["id"])){
            $sql.="WHERE id=:id ";
          }


          $sql.="LIMIT 0, 5";


          $con = $this->container->get('base_datos');
          $query = $con->prepare($sql);
         
          if(isset($args["id"])){
            $query->execute(["id"=>$args["id"]]);
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
            $sql = "SELECT nuevoCliente(:idCliente,:nombre,:apellido1,:apellido2,:telefono,:celular,:direccion,:correo);";
            $con =$this->container->get('base_datos');
            $con->beginTransaction();
            $query = $con->prepare($sql);


            foreach($body as $key => $value){
              $TIPO=gettype($value)=='integer'? PDO::PARAM_INT : PDO::PARAM_STR;
              $value = filter_var($value,FILTER_SANITIZE_SPECIAL_CHARS);
              $query->bindValue($key,$value,$TIPO);
            };


            try{
              $query->execute(); //CREA EL CLIENTE
              //$con->commit();
              $res = $query->fetch(PDO::FETCH_NUM)[0];
              $status = match($res){
                0=>201,
                1=>409
              };
              $id=$body->idCliente;
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


        public function update(Request $request, Response $response, $args){
          $body = json_decode($request->getBody());


          $body = json_decode($request->getBody());
          $sql = "SELECT editarArtefacto(:id,:serie,:modelo,:marca,:categoria,:descripcion);";
          $con =$this->container->get('base_datos');
          $con->beginTransaction();


          $query = $con->prepare($sql);
          $value = filter_var($args['id'],FILTER_SANITIZE_SPECIAL_CHARS);
          $query->bindValue(':id',$value,PDO::PARAM_INT);


          foreach($body as $key => $value){
            $TIPO=gettype($value)=='integer'? PDO::PARAM_INT : PDO::PARAM_STR;
            $value = filter_var($value,FILTER_SANITIZE_SPECIAL_CHARS);
            $query->bindValue($key,$value,$TIPO);
          };
          try{
            $query->execute();
            $con->commit();
            $res = $query->fetch(PDO::FETCH_NUM)[0];
            $status = match($res){
              0=>404,
              1=>200,
            };
          }catch(PDOException $e){
            $status=500;
            con->rollback();
          }
          $query=null;
          $con=null;
         return $response->withStatus($status);
      }


      public function delete(Request $request, Response $response, $args){
        $sql = "SELECT eliminarArtefacto(:id)";
        $con = $this->container->get('base_datos');


        $query = $con->prepare($sql);
        $query->bindValue("id", $args ["id"], PDO::PARAM_INT);
        $query->execute();
        $resp =$query->fetch(PDO::FETCH_NUM)[0];
       
        $status = $resp> 0 ? 200: 404;


        $query = null;
        $con = null;


        return $response->withStatus($status);
     }


     public function filtrar(Request $request, Response $response, $args){
      //serie&modelo&marca&categoria&
     
      $datos = $request->getQueryParams();
 
      $filtro="%";
      foreach($datos as $key =>$value){
        $filtro.="$value%&%";
      }
      $filtro=substr($filtro,0,-1);
      $sql="CALL filtrarArtefacto('$filtro',{$args['pag']},{$args['lim']});";
      $con=$this->container->get('base_datos');
      $query=$con->prepare($sql);
      $query->execute();


      $res = $query->fetchAll();


      $status=$query->rowCount()>0?200:204;


      $query=null;
      $con=null;  
      //Obtener una respuesta
      $response->getBody()->write(json_encode($res));
   
        return $response
        ->withHeader('Content-type','Application/json')
        ->withStatus($status);
    }
    }