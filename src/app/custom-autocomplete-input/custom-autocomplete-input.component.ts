import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';

export interface User {
  name: string;
  id: number
}

@Component({
  selector: 'app-custom-autocomplete-input',
  templateUrl: './custom-autocomplete-input.component.html',
  styleUrls: ['./custom-autocomplete-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CustomAutocompleteInputComponent,
    multi: true
  }]
})
export class CustomAutocompleteInputComponent implements OnInit, ControlValueAccessor {

  onTouched!: () => void;
  onChange!: (value: number) => void;

  myControl = new FormControl();
  options: Observable<User[]> = of([
    {
      name: 'Mary',
      id: 1
    },
    {
      name: 'Shelley',
      id: 2
    },
    {
      name: 'Igor',
      id: 3
    }
  ]);
  filteredOptions!: Observable<User[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        switchMap(name => name ? this._filter(name) : this.options)
      );
  }

  /**
   * Permette di chiamare onChange con l'opzione selezionata
   * @param event
   */
  onSelect(event: MatAutocompleteSelectedEvent) {
    this.onChange((event.option.value as User).id);
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  /**
  * Set del valore da mostrare in UI. E' il valore impostato nel formControl
  * @param value
  */
  writeValue(value: string): void {
    this._filter(value).subscribe(
      option => {
        const [o] = option
        this.myControl.setValue(o);
      }
    )
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private _filter(value: string | number): Observable<User[]> {

    switch (typeof value) {
      case 'string':
        const filterValue = (value as string).toLowerCase();

        return this.options.pipe(
          map(options => options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0))
        );

      case 'number':
        return this.options.pipe(
          map(options => options.filter(option => option.id === value))
        );
    }

  }

}
