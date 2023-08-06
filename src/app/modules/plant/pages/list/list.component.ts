import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { PlantService } from '@data/services/plant.service';
import { AlertService } from '@data/services/alert.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  listPlants:  any[] = [];

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
      next: (res) => {
        // console.log(res);
        if (res.result === 1) {
          this.alertService.successAlert(res.message);
          this.listPlants = res.data;

          this.listPlants.forEach(element => {
            element.imagen = 'http://192.168.0.7' + element.imagen;
          })

          this.spinner.hide();
        } else {
          this.spinner.hide();
        }

      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      }
    })
  }


}
