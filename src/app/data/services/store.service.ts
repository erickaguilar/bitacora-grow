import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  readonly TOKEN_KEY = 'token';
  readonly NAME_KEY = 'name';
  readonly EMAIL_KEY = 'email';

  readonly tokenSubject = new BehaviorSubject<string | null>(null);
  readonly nameSubject = new BehaviorSubject<string | null>(null);
  readonly emailSubject = new BehaviorSubject<string | null>(null);

  constructor() {
    // Inicializar los valores desde el almacenamiento
    this.tokenSubject.next(this.getSecureItem(this.TOKEN_KEY));
    this.nameSubject.next(this.getSecureItem(this.NAME_KEY));
    this.emailSubject.next(this.getSecureItem(this.EMAIL_KEY));
  }

  // Métodos para obtener valores como Observables
  get token$(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  get name$(): Observable<string | null> {
    return this.nameSubject.asObservable();
  }

  get email$(): Observable<string | null> {
    return this.emailSubject.asObservable();
  }

  // Métodos para obtener valores actuales
  get token(): string | null {
    return this.tokenSubject.value;
  }

  get name(): string | null {
    return this.nameSubject.value;
  }

  get email(): string | null {
    return this.emailSubject.value;
  }

  // Métodos para establecer valores
  setToken(token: string): void {
    this.setSecureItem(this.TOKEN_KEY, token);
    this.tokenSubject.next(token);
  }

  setName(name: string): void {
    this.setSecureItem(this.NAME_KEY, name);
    this.nameSubject.next(name);
  }

  setEmail(email: string): void {
    this.setSecureItem(this.EMAIL_KEY, email);
    this.emailSubject.next(email);
  }

  // Método para limpiar todos los datos
  clearAll(): void {
    this.removeSecureItem(this.TOKEN_KEY);
    this.removeSecureItem(this.NAME_KEY);
    this.removeSecureItem(this.EMAIL_KEY);
    this.tokenSubject.next(null);
    this.nameSubject.next(null);
    this.emailSubject.next(null);
  }

  // Métodos privados para el manejo seguro del almacenamiento
  private setSecureItem(key: string, value: string): void {
    try {
      const encryptedValue = btoa(value); // Codificación básica, en producción usar una encriptación más robusta
      sessionStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.error('Error al almacenar datos:', error);
    }
  }

  private getSecureItem(key: string): string | null {
    try {
      const encryptedValue = sessionStorage.getItem(key);
      return encryptedValue ? atob(encryptedValue) : null;
    } catch (error) {
      console.error('Error al recuperar datos:', error);
      return null;
    }
  }

  private removeSecureItem(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Error al eliminar datos:', error);
    }
  }
}
