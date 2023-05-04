import { Component } from '@angular/core';
import { UpdateRoutesService } from '@data/services/update-routes.service';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.css']
})
export class SkeletonComponent {

  constructor(
    public updateRoutes: UpdateRoutesService
  ) { }

}
