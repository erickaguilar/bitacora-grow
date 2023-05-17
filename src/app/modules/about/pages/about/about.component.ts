import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {


  plantForm!: FormGroup;
  selectedFile!: File;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.plantForm = this.fb.group({
      name: ['', Validators.required],
      typePlanta: ['', Validators.required],
      datePlanted: ['', Validators.required]
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


  onSubmit() {
    console.log(this.plantForm.value);
  }


}
