import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  url: string = environment.API_URL + 'plant.php';

  constructor(
    private http: HttpClient
  ) { }

  listPlantsService(): Observable<any> {
    return this.http.get(`${this.url}?user=${localStorage.getItem('token')}`);
  }

  getPlantsService(id: string): Observable<any> {
    return this.http.get(`${this.url}?id=${id}&user=${localStorage.getItem('token')}`);
  }

  registerPlantsService(plant: any): Observable<any> {
    const formData: any = new FormData();
    formData.append("nombre", plant.name);
    formData.append("usuario", localStorage.getItem('token'));
    formData.append("descripcion", plant.description);
    formData.append("imagen", plant.image);
    return this.http.post(this.url, formData);
  }

}
