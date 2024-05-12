import { Component, HostBinding, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fields } from '../../models/fields';

@Component({
	selector: 'app-mother-grade',
	templateUrl: './mother-grade.component.html'
})
export class MotherGradeComponent implements OnInit, OnChanges {
	public readonly controlName = Fields.MotherGrade;
	@Input() formFilters!: FormGroup;
	@HostBinding('class.d-none') hide: boolean = true;
	@HostBinding('attr.id') id = Fields.MotherGrade;
	constructor() { }

	async ngOnInit(): Promise<void> {
		this.hide = this.model(Fields.FilterByOperationNo)?.value == true;
		this.model(Fields.FilterByOperationNo)?.valueChanges.subscribe(data => {
			this.hide = data;
		});
	}

	ngOnChanges(): void {
		let field = this.formFilters.get(Fields.MotherGrade);
		this.hide = field ? !!(this.formFilters.get(Fields.MotherGrade)?.disabled) : true;
	}

	private model(controlName: Fields) {
		return this.formFilters.get(controlName);
	}

}
