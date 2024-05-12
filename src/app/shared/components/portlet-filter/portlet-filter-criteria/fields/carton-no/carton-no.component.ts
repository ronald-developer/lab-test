import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fields } from '../../models/fields';

@Component({
    selector: 'app-carton-no',
    templateUrl: './carton-no.component.html'
})
export class CartonNoComponent implements OnChanges {

    public controlName = Fields.CartonNo;
    @Input() formFilters!: FormGroup;
    @HostBinding('attr.id') id = Fields.CartonNo;
    @HostBinding('class.d-none') hide!: boolean;
    constructor() { }

    ngOnChanges(): void {
        let field = this.formFilters.get(Fields.CartonNo);
        this.hide = field ? !!(this.formFilters.get(Fields.CartonNo)?.disabled) : true;
    }
}
