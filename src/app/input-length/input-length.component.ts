import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-length',
  template: `
    <input
      type="text"
      (blur)="onTouched()"
      (input)="appendStringLength($event.target.value)"
      [disabled]="disabled"
      [value]="value" />
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputLengthComponent,
    multi: true
  }]
})
export class InputLengthComponent implements ControlValueAccessor {

  value!: string;
  onChange!: (value: string) => void;
  onTouched!: () => void;
  disabled!: boolean;

  /**
    * Writes a new value to the element.
    *
    * This method is called by the forms API to write to the view
    * when programmatic changes from model to view are requested.
    */
  writeValue(value: string): void {
    this.value = value;
  }

  /**
  * Registers a callback function that is called when the control's value changes in the UI.
  *
  * This method is called by the forms API on initialization to update the form model
  * when values propagate from the view to the model.
  * When implementing the `registerOnChange` method in your own value accessor,
  * save the given function so your class calls it at the appropriate time.
  */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
    * Registers a callback function is called by the forms API on initialization to update the form model on blur.
    *
    * When implementing `registerOnTouched` in your own value accessor,
    * ave the given function so your class calls it when the control
    * should be considered blurred or "touched".
    */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
  * Function that is called by the forms API when the control status changes to or from 'DISABLED'.
  * Depending on the status, it enables or disables the appropriate DOM element.
  */
  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  appendStringLength(value: string) {
    const valueLength = value.length.toString();
    this.onChange(valueLength);
    this.onTouched();
  }

}
