import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroupDirective, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true
    }
  ]
})
export class TextAreaComponent implements OnInit, ControlValueAccessor {
  private _value: string = '';
  public onChange = (value: string) => {};
  public onTouched = () => {}
  public control: FormControl = new FormControl();
  @Input() text: string = '';
  @Input() maxLength!: number;
  @Input() placeholder: string = '';
  @Input() isRequired: boolean = false;
  @Input() controlName!: string;
  @Output() onValueChange = new EventEmitter<string>();

  constructor(private rootFormGroup: FormGroupDirective) { }

  ngOnInit(): void {
    this.control = this.rootFormGroup.control.get(this.controlName) as FormControl;
    const validator = this.control.validator ? [this.control.validator] : [];
    validator.push(Validators.maxLength(this.maxLength))
    this.control.setValidators(validator);
    this.control.updateValueAndValidity();
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
    if(value !== this.value) {
      this._value = value;
      this.control.setValue(value, {emitEvent: false});
      this.onValueChange.emit(value);
    }
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
