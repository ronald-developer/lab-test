import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fields } from '../../models/fields';

@Component({
    selector: 'app-sample-type',
    templateUrl: './sample-type.component.html'
})
export class SampleTypeComponent implements OnChanges {
    public controlName = Fields.SampleType;
    @Input() formFilters!: FormGroup;
    @HostBinding('attr.id') id = Fields.SampleType;
    @HostBinding('class.d-none') hide!: boolean;
    constructor() { }

    ngOnChanges(): void {
        let field = this.formFilters.get(Fields.SampleType);
        this.hide = field ? !!(this.formFilters.get(Fields.SampleType)?.disabled) : true;
    }
}
