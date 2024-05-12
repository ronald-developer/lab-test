import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fields } from '../../models/fields';

@Component({
    selector: 'app-position-type',
    templateUrl: './position-type.component.html'
})
export class PositionTypeComponent implements OnChanges {
    public controlName = Fields.PositionType;
    @Input() formFilters!: FormGroup;
    @HostBinding('attr.id') id = Fields.PositionType;
    @HostBinding('class.d-none') hide!: boolean;
    constructor() { }

    ngOnChanges(): void {
        let field = this.formFilters.get(Fields.PositionType);
        this.hide = field ? !!(this.formFilters.get(Fields.PositionType)?.disabled) : true;
    }
}
