import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fields } from '../../models/fields';

@Component({
    selector: 'app-charger-type',
    templateUrl: './charger-type.component.html'
})
export class ChargerTypeComponent implements OnChanges {
    public controlName = Fields.ChargerType;
    @Input() formFilters!: FormGroup;
    @HostBinding('attr.id') id = Fields.ChargerType;
    @HostBinding('class.d-none') hide!: boolean;
    constructor() { }

    ngOnChanges(): void {
        let field = this.formFilters.get(Fields.ChargerType);
        this.hide = field ? !!(this.formFilters.get(Fields.ChargerType)?.disabled) : true;
    }
}
