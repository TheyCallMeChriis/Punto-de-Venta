import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';

const _SERVER = 'http://localhost:8000/api/usr';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly http = inject(HttpClient);

  constructor() { }

  resetearPassw(id : string) {
    return this.http.patch<any>(`${_SERVER}/api/usr/${id}`, {})
      .pipe(
        map(() => true),
        catchError((error) => {
          return of(error.status);
        })
      );
  }
}
