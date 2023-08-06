import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = environment.API_URL + 'user.php'

  constructor(
    private http: HttpClient
  ) { }

  autorizationService(name: string, password: string): Observable<any> {
    return this.http.get(`${this.url}?nombre=${name}&contrasena=${password}`);
  }

  registerService(name: string, password: string, email: string): Observable<any> {
    const formData: any = new FormData();
    formData.append("nombre", name);
    formData.append("contrasena", password);
    formData.append("email", email);
    return this.http.post(this.url, formData);
  }

}
