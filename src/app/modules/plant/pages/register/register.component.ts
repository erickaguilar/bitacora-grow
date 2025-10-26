
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { PlantService } from '@data/services/plant.service';
import { AlertService } from '@data/services/alert.service';

// Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ]
})
export class RegisterComponent implements OnInit {

  plantForm!: FormGroup;
  selectedImage!: File | null;
  imagePreviewUrl: string | ArrayBuffer | null = 'assets/images/e81b1e5d5060.jpg';

  constructor(
    readonly formBuilder: FormBuilder,
    readonly plantService: PlantService,
    readonly alertService: AlertService,
    readonly spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.createPlantForm();
  }

  createPlantForm(): void {
    this.plantForm = this.formBuilder.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      birthDate: ['', Validators.required],
      image: [null] // Not required, but part of the form
    });
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedImage = fileList[0];
      // Generate image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedImage);
    } else {
      this.selectedImage = null;
      this.imagePreviewUrl = 'assets/images/e81b1e5d5060.jpg'; // Reset to default
    }
  }

  registerPlant(): void {
    if (this.plantForm.invalid) {
      this.alertService.errorAlert('Por favor, completa todos los campos requeridos.');
      return;
    }

    this.spinner.show();

    // We need to send FormData because we are including a file
    const formData = new FormData();
    formData.append('name', this.plantForm.get('name')?.value);
    formData.append('species', this.plantForm.get('species')?.value);
    formData.append('birthDate', this.plantForm.get('birthDate')?.value);
    if (this.selectedImage) {
      formData.append('image', this.selectedImage, this.selectedImage.name);
    }

    this.plantService.registerPlant(formData).subscribe({
      next: (res) => {
        this.alertService.successAlert(`Planta '${res.name}' registrada con éxito.`);
        this.plantForm.reset();
        this.imagePreviewUrl = 'assets/images/e81b1e5d5060.jpg';
        this.selectedImage = null;
      },
      error: (err) => {
        console.error(err);
        this.alertService.errorAlert('Hubo un error al registrar la planta.');
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }
}
