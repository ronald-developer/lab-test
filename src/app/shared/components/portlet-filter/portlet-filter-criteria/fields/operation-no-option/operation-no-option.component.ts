import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fields } from '../../models/fields';

@Component({
    selector: 'app-operation-no-option',
    templateUrl: './operation-no-option.component.html'
})
export class OperationNoOptionComponent implements OnChanges{
    public readonly controlName = Fields.FilterByOperationNo;
    @Input() formFilters!: FormGroup;
	public hide: boolean;
    constructor() { }

    public check() {
        if (this.model(Fields.FilterByOperationNo)?.value) {
            this.model(Fields.MotherGrade)?.setValue(null);
        } else {
            this.model(Fields.OperationNo)?.setValue(null);
        }
    }

    private model(controlName: Fields) {
        return this.formFilters.get(controlName);
    }

	ngOnChanges(): void {
        let field = this.formFilters.get(Fields.FilterByOperationNo);
        this.hide = field ? !!(this.formFilters.get(Fields.FilterByOperationNo)?.disabled) : true;
    }
}
