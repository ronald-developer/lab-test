import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';
import { Fields } from '../../models/fields';

@Component({
    selector: 'app-date',
    templateUrl: './date.component.html',
    styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
    public dateCustomClasses: DatepickerDateCustomClasses[];
    public controlName = Fields.FromDate;
    @HostBinding('class.d-none') hide: boolean = true;
    @HostBinding('attr.id') id = Fields.FromDate;
    @Input() formFilters!: FormGroup;
    constructor() {

    }

    ngOnInit(): void {
        this.hide = this.model(Fields.FilterByDate)?.value == false;
        this.highlightCurrentDateWhenEmpty(false);
        this.model(Fields.FilterByDate)?.valueChanges.subscribe(data => {
            this.hide = !data;
        });
        this.model(this.controlName)?.valueChanges.subscribe(data => {

            this.highlightCurrentDateWhenEmpty(data);
        });
    }

    private highlightCurrentDateWhenEmpty(hasValue: boolean) {
        if (hasValue) {
            this.dateCustomClasses = [];
        } else {
            const now = new Date();
            this.dateCustomClasses = [
                { date: now, classes: ['bg-success'] }
            ];
        }
    }

	ngOnChanges(): void {
		let field = this.formFilters.get(Fields.FromDate);
		this.hide = field ? !!(this.formFilters.get(Fields.FromDate)?.disabled) : true;
	}

    private model(controlName: Fields) {
        return this.formFilters.get(controlName);
    }
}
