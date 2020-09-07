import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';
const AUTHORITIES_KEY = 'authorities';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private roles: Array<string> = [];

  constructor() { }

  saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  saveUsername(username: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  saveAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach((authority: { authority: string; }) => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }

  logOut(): void {
    window.sessionStorage.clear();
  }
}
