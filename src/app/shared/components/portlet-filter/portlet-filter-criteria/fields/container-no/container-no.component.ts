import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fields } from '../../models/fields';

@Component({
    selector: 'app-container-no',
    templateUrl: './container-no.component.html'
})
export class ContainerNoComponent implements OnChanges {

    public controlName = Fields.ContainerNo;
    @Input() formFilters!: FormGroup;
    @HostBinding('attr.id') id = Fields.ContainerNo;
    @HostBinding('class.d-none') hide!: boolean;
    constructor() { }

    ngOnChanges(): void {
        let field = this.formFilters.get(Fields.ContainerNo);
        this.hide = field ? !!(this.formFilters.get(Fields.ContainerNo)?.disabled) : true;
    }
}
