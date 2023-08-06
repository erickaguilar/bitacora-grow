import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plant } from '@data/interfaces/plant.model';
import { NgxSpinnerService } from "ngx-spinner";
import { PlantService } from '@data/services/plant.service';
import { AlertService } from '@data/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit  {

  plant!: Plant;
  plantForm!: FormGroup;
  selectedImage!: File;
  imagenUrl: string = 'assets/images/e81b1e5d5060.jpg';

  constructor(
    private formBuilder: FormBuilder,
    private plantService: PlantService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
  ) {  }

  ngOnInit(): void {
    this.createPlantForm();
  }

  createPlantForm(): void {
    this.plantForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
    this.convertirImagenABlob();
  }

  convertirImagenABlob(): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imagenUrl = reader.result as string;
    };
    reader.readAsDataURL(this.selectedImage);
  }

  registerPlant(): void {
    if (this.plantForm.valid) {
      this.spinner.show();

      const plant: Plant = this.plantForm.value;
      plant.image = this.selectedImage;

      this.plantService.registerPlantsService(plant).subscribe({
        next: (res) => {
          if (res) {
            this.alertService.successAlert('La información se ha enviado correctamente.');
            this.plantForm.reset();
          }
        },
        error:(err) => {
          console.error(err.message);
          this.alertService.errorAlert(err.statusText);
          this.spinner.hide();
        },
        complete: () => {
          this.spinner.hide();
          this.plantForm.reset();
        }
      });

    } else {
      // Si el formulario no es válido, puedes mostrar mensajes de validación o tomar otras acciones
    }
  }

}
