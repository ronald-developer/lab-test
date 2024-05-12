import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '../../../../shared/models/select-option';
import { MotherGradeService } from './../../../services/dropdowns/mother-grade.service';
const MOTHER_GRADE_CONTROL_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => MotherGradeDropdownComponent),
	multi: true
}

@Component({
	selector: 'app-mother-grade-dropdown',
	templateUrl: './mother-grade-dropdown.component.html',
	styleUrls: ['./mother-grade-dropdown.component.scss'],
	providers: [MOTHER_GRADE_CONTROL_ACCESSOR]
})
export class MotherGradeDropdownComponent implements OnInit {
	public motherGrades: SelectOption[] = [];
	public motherGradeId!: string;
	private onChange!: Function;
	private onTouch!: Function;
	@Input() invalid!: boolean;
	@Input() set defaultSelectedMotherGradeId(value: string) {

		setTimeout(() => {
			this.motherGradeId = value ?? '';
		}, 50);
	}
	constructor(private motherGradeService: MotherGradeService) { }

	async ngOnInit(): Promise<void> {
		this.motherGrades = await this.motherGradeService.getAll();
	}

	writeValue(obj: any): void {
		this.motherGradeId = obj || null;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	public selectionChanged() {
		this.onChange(this.motherGradeId);
	}

	public onClick() {
		this.onTouch();
	}

}
