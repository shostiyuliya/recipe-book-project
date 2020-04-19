import { Component, Input, OnInit, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DropdownDataModel } from '../../../feature/homepage/search/models/dropdown-data.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit, ControlValueAccessor {

  @Input() dropdownData: DropdownDataModel;

  onChanged: any = () => {};
  // TODO unused
  onTouched: any = () => {};

  constructor(
    private http: HttpClient,
    @Optional() private ngControl: NgControl
  ) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  // TODO unused
  ngOnInit() {
  }

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
