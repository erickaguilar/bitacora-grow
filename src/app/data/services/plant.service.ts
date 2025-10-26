import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPlant } from '../interfaces/plant.model';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  private apiUrl = '/api/plants'; // The interceptor handles the token

  constructor(private http: HttpClient) { }

  /**
   * Gets all plants for the logged-in user.
   */
  listPlantsService(): Observable<IPlant[]> {
    return this.http.get<IPlant[]>(this.apiUrl);
  }

  /**
   * Gets a single plant by its ID.
   * @param id The ID of the plant.
   */
  getPlantById(id: string): Observable<IPlant> {
    return this.http.get<IPlant>(`${this.apiUrl}/${id}`);
  }

  /**
   * Registers a new plant with an optional image.
   * @param formData The FormData object containing plant data and the image file.
   */
  registerPlant(formData: FormData): Observable<IPlant> {
    // The backend will associate this plant with the logged-in user via the token.
    // When sending FormData, HttpClient sets the Content-Type header automatically.
    return this.http.post<IPlant>(this.apiUrl, formData);
  }

}