import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UpdateRoutesService {

  constructor(private router: Router) { }

  get hideNavigation(): boolean {
    return ![
      '/auth'
    ].includes(this.router.url);
  }
}
