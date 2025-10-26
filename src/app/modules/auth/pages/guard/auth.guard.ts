import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { StoreService } from '@data/services/store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private readonly router: Router,
    private readonly storeService: StoreService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {

    if (this.storeService.token) {
      return true;
    } else {
      return this.router.createUrlTree(['/auth']);
    }
  }

}
