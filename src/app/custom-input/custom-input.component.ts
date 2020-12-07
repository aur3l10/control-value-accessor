import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CustomInputComponent,
    multi: true
  }]
})
export class CustomInputComponent implements ControlValueAccessor {

  value!: string;
  onChange!: (value: string) => void;
  onTouched!: () => void;
  disabled!: boolean;

  constructor() { }

  /**
  * Write a new value to the element.
  */
  writeValue(value: string): void {
    this.value = value;
  }

  /**
  * Set the function to be called when the control receives a change event.
  */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
  * Set the function to be called when the control receives a touch event.
  */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
  * This function is called when the control status changes to or from "DISABLED".
  * Depending on the value, it will enable or disable the appropriate DOM element.
  * @param isDisabled
  */
  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

}
