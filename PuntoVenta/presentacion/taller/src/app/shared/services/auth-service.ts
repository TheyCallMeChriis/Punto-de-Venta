import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, retry, tap } from 'rxjs';
import { TokenService } from './token'
import { IToken } from '../models/interfaces';
import { User } from '../models/User';
import { signal } from '@angular/core';
import { Router } from '@angular/router';



const _SERVER = 'http://localhost:8000'; 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private http = inject(HttpClient);
 private srvToken = inject(TokenService);
 private router = inject(Router);
 
//private usrActualSubject = new BehaviorSubject<User>(new User());
;//public userActualObs = this.usrActualSubject.asObservable();
public userActualS = signal(new User);


  constructor() { }


  public login(datos :{idUsuario : '',passw: ''}) : Observable<any>{
    return this.http.post<any>(`${_SERVER}/api/auth`, datos)
    .pipe(retry(1),tap((tokens) =>{
   this.doLogin(tokens);
 console.log('Tokens recibidos:', tokens);
    }),
    map(() => true),
    catchError((error) =>{
      return of(error.status)
    })
  )
  }

  public loggOut(){
    if(this.isLoggedIn()){
      this.http
      .delete(`${_SERVER}/api/auth/cerrar/${this.userActual.idUsuario}`)
      .subscribe();
    this.doLoggOut();


    }

  }

  private doLogin(Tokens : IToken){

    this.srvToken.setTokens(Tokens);
    //this.usrActualSubject.next(this.userActual);
    this.userActualS.set(this.userActual);

    //guardar tokens
    //actualizar datos globales para usuario o rol
  }

  private doLoggOut(){
    if(this.srvToken.token){
      this.srvToken.eliminarTokens();
    }

    this.userActualS.set(this.userActual);
    this.router.navigate(['/login']);
    
  }

  public isLoggedIn(): boolean {
 
  return !!this.srvToken.token && !this.srvToken.jwtTokenExp();
}

public verificarRefresh(): Observable<any> {
  return this.http.patch<IToken>(`${_SERVER}/api/auth/refrescar`, {}).pipe(
    tap((nuevoToken: IToken) => {
      console.log('Token refrescado:', nuevoToken);
      this.srvToken.setTokens(nuevoToken);
    }),
    catchError((err) => {
      console.error('Error al refrescar token:', err);
      this.loggOut();
      return of(null);
    })
  );
}
public get userActual() : User {
  if (!this.srvToken.token) {
    return new User();
  } else {
    const tokenD = this.srvToken.decodeToken();
    return new User({
      idUsuario: tokenD.sub,
      nombre: tokenD.nom,
      rol: tokenD.rol
    });
  }
}

}
