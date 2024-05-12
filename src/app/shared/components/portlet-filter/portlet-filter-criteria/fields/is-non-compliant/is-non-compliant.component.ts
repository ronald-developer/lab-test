import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fields } from '../../models/fields';

@Component({
    selector: 'app-is-non-compliant',
    templateUrl: './is-non-compliant.component.html'
})
export class IsNonCompliantComponent implements OnChanges {

    public controlName = Fields.IsNonCompliant;
    @Input() formFilters!: FormGroup;
    @HostBinding('attr.id') id = Fields.IsNonCompliant;
    @HostBinding('class.d-none') hide!: boolean;
    constructor() { }

    ngOnChanges(): void {
		this.hide = !!(this.formFilters.get(Fields.IsNonCompliant)?.disabled);
    }
}
