import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateBrandRequest } from 'src/app/brand/dtos/CreateBrand.request';
import { BrandService } from '../../../../brand/service/brand.service';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent implements OnInit {

  public form: FormGroup = new FormGroup({});
  public maxLengthName: number = 50;
  public maxLengthDescription: number = 120;
  public disable: boolean = false;

  @Output() brandCreated = new EventEmitter<void>();
  @Output() brandNotCreated = new EventEmitter<string>();

  constructor(private fb: FormBuilder, private service: BrandService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  public createBrand(): void {
    //TODO: Call brand service
    const {name, description}: CreateBrandRequest = this.form.value;
    
    this.service.createBrand({name, description}).subscribe({
      next: () => {
        this.brandCreated.emit();
      },
      error: (err: HttpErrorResponse) => {
        if(err.status === 0) {
          this.brandNotCreated.emit('Conexión fallida con el servidor');
          return;
        }
        if(err.status === 403) {
          this.brandNotCreated.emit('Error de autentificación');
          return;
        }
        return this.brandNotCreated.emit(err.error.message);
      }
    });
  }

  onValueChange(controlName: string, controlValue:string) {
    this.form.get(controlName)?.setValue(controlValue)
  }

  onSubmit(): void {
    if(!this.form.valid) {
      this.brandNotCreated.emit('Formulario invalido')
      return;
    }
    this.createBrand();
  }

  resetForm() {
    this.form.reset();
  }

  disableButton(event: boolean) {
    this.disable = event;
  }

}
