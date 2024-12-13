import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  
  logout(): void {
    localStorage.removeItem('token'); // Token törlése
  }

  getDashboardData() {
    return this.http.get('http://localhost:8000/api/dashboard'); // Laravel API végpont
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/refresh`, {});
  }
  
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}