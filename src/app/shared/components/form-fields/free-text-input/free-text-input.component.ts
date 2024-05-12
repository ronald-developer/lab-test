import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
const FREE_TEXT_INPUT_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FreeTextInputComponent),
  multi: true
}

@Component({
  selector: 'app-free-text-input',
  templateUrl: './free-text-input.component.html',
  providers: [FREE_TEXT_INPUT_CONTROL_ACCESSOR]
})
export class FreeTextInputComponent implements ControlValueAccessor {
  public inputValue!: string | null;
  private onChange!: Function;
  private onTouch!: Function;
  @Input() invalid!: boolean;
  @Input() title!: string;
  constructor() { }

  writeValue(obj: any): void {
    this.inputValue = obj !== null ? obj : null;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public modelChanged() {
    this.onChange(this.inputValue);
  }

  public onClick() {
    this.onTouch();
  }
}
