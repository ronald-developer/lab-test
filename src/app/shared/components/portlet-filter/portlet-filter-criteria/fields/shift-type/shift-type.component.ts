import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fields } from '../../models/fields';
@Component({
    selector: 'app-shift-type',
    templateUrl: './shift-type.component.html'
})
export class ShiftTypeComponent implements  OnChanges {
    public controlName = Fields.ShiftType;
    @Input() formFilters!: FormGroup;
    @HostBinding('attr.id') id = Fields.ShiftType;
    @HostBinding('class.d-none') hide!: boolean;
    constructor() { }

    ngOnChanges(): void {
        this.hide = !!(this.formFilters.get(Fields.ShiftType)?.disabled);
    }

}
