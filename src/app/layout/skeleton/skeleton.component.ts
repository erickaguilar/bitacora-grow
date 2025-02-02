import { Component } from '@angular/core';
import { UpdateRoutesService } from '@data/services/update-routes.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-skeleton',
    templateUrl: './skeleton.component.html',
    styleUrls: ['./skeleton.component.scss'],
    standalone: false
})
export class SkeletonComponent {

  constructor(
    public updateRoutes: UpdateRoutesService,
    private router: Router
  ) { }


  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

  public routes(dir: string): void {
    this.router.navigate([dir]);
  }

}
