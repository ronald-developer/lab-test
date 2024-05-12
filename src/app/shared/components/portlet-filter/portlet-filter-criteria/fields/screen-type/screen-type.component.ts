import { Component, HostBinding, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fields } from '../../models/fields';

@Component({
  selector: 'app-screen-type',
  templateUrl: './screen-type.component.html'
})
export class ScreenTypeComponent implements OnChanges {
  public controlName = Fields.ScreenType;
  @Input() formFilters!: FormGroup;
  @HostBinding('attr.id') id = Fields.ScreenType;
  @HostBinding('class.d-none') hide!: boolean;
  constructor() { }

  ngOnChanges(): void {
    let field = this.formFilters.get(Fields.ScreenType);
    this.hide = field ? !!(this.formFilters.get(Fields.ScreenType)?.disabled) : true;
  }
}
