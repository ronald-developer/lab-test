import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fields } from '../../models/fields';
@Component({
    selector: 'app-test-type',
    templateUrl: './test-type.component.html'
})
export class TestTypeComponent implements  OnChanges {
    public controlName = Fields.TestType;
    @Input() formFilters!: FormGroup;
    @HostBinding('attr.id') id = Fields.TestType;
    @HostBinding('class.d-none') hide!: boolean;
    constructor() { }

    ngOnChanges(): void {
		let field = this.formFilters.get(Fields.TestType);
        this.hide = field ? !!(this.formFilters.get(Fields.TestType)?.disabled) : true;
    }

}
