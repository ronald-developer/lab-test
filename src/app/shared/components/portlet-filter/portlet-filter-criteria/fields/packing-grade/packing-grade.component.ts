import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fields } from '../../models/fields';

@Component({
    selector: 'app-packing-grade',
    templateUrl: './packing-grade.component.html'
})
export class PackingGradeComponent implements OnChanges {
    public controlName = Fields.PackingGrade;
    @Input() formFilters!: FormGroup;
    @HostBinding('attr.id') id = Fields.PackingGrade;
    @HostBinding('class.d-none') hide!: boolean;
    constructor() { }

    ngOnChanges(): void {
        this.hide = !!(this.formFilters.get(Fields.PackingGrade)?.disabled);
    }

}
