import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // ...

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>('http://localhost:3000/auth/signin', body);
  }

  logout(): Observable<any> {
    return this.http.post<any>('http://localhost:3000/auth/signout', {});
  }

  whoami(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/auth/whoami');
  }
}
