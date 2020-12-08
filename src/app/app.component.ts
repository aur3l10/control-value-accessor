import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'control-value-accessor';

  inputTest: FormControl = new FormControl(undefined);
  inputTest2: FormControl = new FormControl(undefined);
  customAutocomplete: FormControl = new FormControl(3);

}
