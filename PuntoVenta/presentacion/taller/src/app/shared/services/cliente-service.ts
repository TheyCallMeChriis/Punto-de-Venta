import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TipoCliente } from '../models/interfaces';

import { catchError, map, Observable, of, retry, tap, throwError } from 'rxjs';


const _SERVER = 'http://localhost:8000';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  filtrar(parametros: any) {
    let params = new HttpParams;
    for (const prop in parametros) {
      params = params.append(prop, parametros[prop]);
    }
    return this.http.get<any>(`${_SERVER}/api/cliente/filtrar/0/5`,
      { params: params }
    )
  }
  guardar(datos: TipoCliente, id?: number) : Observable<TipoCliente> {
    delete datos.id;
    
    if (id) {
      return this.http.put<any>(`${_SERVER}/api/cliente/${id}`, datos);
    }
    return this.http.post<any>(`${_SERVER}/api/cliente`, datos);
  }

  eliminar(id : number){
    return this.http.delete<any>(`${_SERVER}/api/cliente/${id}`)
      .pipe(
        retry(1),
        map(() => true),
        catchError(this.handleError)
      );
    }

    buscar(id : number){
      return this.http.get<TipoCliente>(`${_SERVER}/api/cliente/${id}`)
    }

    private handleError(error : any){
      return throwError(
        () =>{
          return error.status
        }
      )
    }

  }
