import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../../category/service/category.service";
import {CreateCategoryRequest} from "../../../../category/dtos/request/CreateCategory.request";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public maxLengthDescription: number = 90;
  public maxLengthName: number = 50;

  @Output() categoryCreated = new EventEmitter<void>();
  @Output() categoryNotCreated = new EventEmitter<string>();

  constructor(private fb: FormBuilder, public service: CategoryService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  public createCategory(): void {
    const {name, description}: CreateCategoryRequest = this.form.value;

    this.service.createCategory({name, description}).subscribe({
      next: () => {
        this.categoryCreated.emit();
      },
      error: (error: HttpErrorResponse) => {
        if(error.status === 0){
          this.categoryNotCreated.emit('Conexión fallida con el servidor');
          return;
        }
        if(error.status === 403){
          this.categoryNotCreated.emit('Error no de autentificación');
          return;
        }
        return this.categoryNotCreated.emit(error.error.message)
      }
    });
  }

  onValueChange(controlName: string, controlValue: string) {
    this.form.get(controlName)?.setValue(controlValue);
  }

  onSubmit(): void {
    if(!this.form.valid) {
      this.categoryNotCreated.emit('Formulario inválido')
      return;
    }
    this.createCategory();
  }

  resetForm() {
    this.form.reset();
  }
}
