export interface TipoCliente{
id?:number,
idCliente: string,
nombre:string,
apellido1:string,
apellido2:string,
telefono:string,
celular:string,
direccion:string,
correro:string,
fechaIngreso:string
};

export interface IToken {
    token : string,
    tkRef : string
}