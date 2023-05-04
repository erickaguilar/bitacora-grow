import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  constructor(
    private http: HttpClient
  ) { }

  autorizationService(name: string, password: string): Observable<any> {
    return this.http.get(`${environment.urlLogin}?nombre=${name}&contrasena=${password}`);
  }

  registerService(name: string, password: string, email: string): Observable<any> {
    const formData: any = new FormData();
    formData.append("nombre", name);
    formData.append("contrasena", password);
    formData.append("email", email);
    return this.http.post(environment.urlLogin, formData);
  }

}
