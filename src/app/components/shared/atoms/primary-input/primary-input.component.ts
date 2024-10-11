import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroupDirective, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-primary-input',
  templateUrl: './primary-input.component.html',
  styleUrls: ['./primary-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimaryInputComponent),
      multi: true
    }
  ]
})
export class PrimaryInputComponent implements OnInit {

  private onChange = (value: string) => {};
  private onTouched = () => {};
  public control: FormControl = new FormControl();
  @Input() controlName!: string;
  @Input() text: string = '';
  @Input() type: 'text' | 'password' = 'text';
  @Input() placeholder: string = '';
  @Input() maxLength: number = 0;
  @Input() isRequired: boolean = false;
  @Output() onValueChange = new EventEmitter<string>();
  showPassword: boolean = true;

  constructor(private rootFormGroup: FormGroupDirective) { }

  ngOnInit(): void {
    console.log(this.text)
    this.control = this.rootFormGroup.control.get(this.controlName) as FormControl;
  }

  toggleVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  getErrorMessage(): string {
    const errors = this.control.errors;
    if(errors?.['required']) {
      return 'Este campo es requerido';
    }
    if(errors?.['minlength']) {
      return `Debe tener al menos ${errors?.['minlength'].requiredLength} caracteres`;
    }
    if(errors?.['maxlength']) {
      return `Debe tener máximo ${errors?.['maxlength'].requiredLength} caracteres`;
    }
    return '';
  }

  get value(): string {
    return this.control.value;
  }

  set value(value: string) {
    this.control.setValue(value);
    this.onValueChange.emit(value);
  }

  onInput(event: any): void {
    this.onChange(event.target.value);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
