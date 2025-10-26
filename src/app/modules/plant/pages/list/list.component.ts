import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { PlantService } from '@data/services/plant.service';
import { AlertService } from '@data/services/alert.service';
import { IPlant } from '@data/interfaces/plant.model';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    standalone: false
})
export class ListComponent implements OnInit {

  listPlants: IPlant[] = [];

  constructor(
    private plantService: PlantService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
  ) {  }

  ngOnInit(): void {
    this.getListPlant();
  }

  getListPlant(): void {
    this.spinner.show();
    this.plantService.listPlantsService().subscribe({
      next: (plants) => {
        this.listPlants = plants;
      },
      error: (err) => {
        console.error('Error fetching plants:', err);
        this.alertService.errorAlert('No se pudieron cargar las plantas.');
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

}
