import { Component, Input, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DropdownDataModel } from '../../../feature/homepage/search/models/dropdown-data.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html'
})
export class DropdownComponent implements ControlValueAccessor {

  @Input() dropdownData: DropdownDataModel;

  constructor(
    private http: HttpClient,
    @Optional() private ngControl: NgControl
  ) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  onChanged: any = () => {};

  writeValue(obj: any): void {
  }

  onClick(value) {
    this.onChanged(value);
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
  }

}
