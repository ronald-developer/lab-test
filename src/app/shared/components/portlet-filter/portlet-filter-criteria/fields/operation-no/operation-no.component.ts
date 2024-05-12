import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fields } from '../../models/fields';

@Component({
    selector: 'app-operation-no',
    templateUrl: './operation-no.component.html'
})
export class OperationNoComponent implements OnInit {
    public readonly controlName = Fields.OperationNo;
    @Input() formFilters!: FormGroup;
    @HostBinding('class.d-none') hide!: boolean;
    @HostBinding('attr.id') id = Fields.OperationNo;
    constructor() { }

    async ngOnInit(): Promise<void> {
        this.hide = this.model(Fields.FilterByOperationNo)?.value == false;
        this.model(Fields.FilterByOperationNo)?.valueChanges.subscribe(data => {
            this.hide = !data;
        });
    }

    private model(controlName: Fields) {
        return this.formFilters.get(controlName);
    }

}
