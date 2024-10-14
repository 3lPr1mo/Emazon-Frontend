import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroupDirective, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";

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
export class PrimaryInputComponent implements OnInit, ControlValueAccessor {

  private onChange = (value: string) => {};
  public onTouched = () => {};
  public control: FormControl = new FormControl();
  @Input() controlName!: string;
  @Input() text: string = '';
  @Input() type: 'text' | 'password' = 'text';
  @Input() placeholder: string = '';
  @Input() maxLength!: number;
  @Input() isRequired: boolean = false;
  @Output() onValueChange = new EventEmitter<string>();
  showPassword: boolean = true;

  constructor(private rootFormGroup: FormGroupDirective) { }

  ngOnInit(): void {
    this.control = this.rootFormGroup.control.get(this.controlName) as FormControl;
    const validator = this.control.validator ? [this.control.validator] : [];
    validator.push(Validators.maxLength(this.maxLength))
    this.control.setValidators(validator);
    this.control.updateValueAndValidity();
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

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

}
