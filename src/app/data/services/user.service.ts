import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = '/api/users';

  constructor(private http: HttpClient) { }

  autorizationService(email: string, password: string): Promise<any> {
    const source$ = this.http.post<AuthResponse>(`${this.apiUrl}/signin`, { email, password });
    return lastValueFrom(source$);
  }

  registerService(name: string, email: string, password: string): Promise<any> {
    const source$ = this.http.post(`${this.apiUrl}/signup`, { name, email, password });
    return lastValueFrom(source$);
  }

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

}