import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private ACCESS_ADMIN_API = 'http://localhost:8080/default/admin';
  private ACCESS_MEMBER_API = 'http://localhost:8080/default/member';

  constructor(private http: HttpClient) { }

  accessAdminPage(): Observable<string> {
    return this.http.get(this.ACCESS_ADMIN_API, { responseType: 'text' });
  }

  accessMemberPage(): Observable<string> {
    return this.http.get(this.ACCESS_MEMBER_API, { responseType: 'text' });
  }
}
