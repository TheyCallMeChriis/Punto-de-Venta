import { Injectable } from '@angular/core';
import { IToken } from '../models/interfaces';
import { JwtHelperService } from '@auth0/angular-jwt'
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor() {}

  public setToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  public setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN, token);
  }

  public setTokens(token: IToken): void {
    this.setToken(token.token);
    this.setRefreshToken(token.tkRef);
  }

  public get token(): any {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  public get refreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  public eliminarTokens(): void {
  localStorage.removeItem(this.JWT_TOKEN);
  localStorage.removeItem(this.REFRESH_TOKEN);
}

public decodeToken(): any {
  const helper = new JwtHelperService();
  return helper.decodeToken(this.token);
}

public jwtTokenExp(): boolean | Promise<boolean> {
  const helper = new JwtHelperService();
  return helper.isTokenExpired(this.token);
}

}
