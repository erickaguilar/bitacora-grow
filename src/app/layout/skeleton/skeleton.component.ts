import { Component } from '@angular/core';
import { UpdateRoutesService } from '@data/services/update-routes.service';
import { Router } from '@angular/router';
import { StoreService } from '@data/services/store.service';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
  standalone: false
})
export class SkeletonComponent {

  constructor(
    readonly updateRoutes: UpdateRoutesService,
    readonly router: Router,
    readonly storeService: StoreService
  ) { }

  logout(): void {
    this.storeService.clearAll();
    this.router.navigate(['/auth']);
  }

  routes(dir: string): void {
    this.router.navigate([dir]);
  }

}
