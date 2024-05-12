import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { FormBuilderHelper } from 'src/app/utils/form-builder-helper.utils';
import { StemDegsForm, stemDegsFormControlDescriptor } from '../models/stem-degs-form-descriptor';
import { StemDegsTestCalculatorService } from '../services/stem-degs-test-calculator.service';

@Component({
	selector: 'app-stem-degs-form',
	templateUrl: './stem-degs-form.component.html'
})
export class StemDegsFormComponent implements OnInit {

	public formGroup!: FormGroup;
	public submittedInvalid!: boolean;
	@Input() isEdit!: boolean;
	@Input() set initialData(formData: StemDegsForm) {
		if (formData) {
			this.formGroup.patchValue(formData);
		}
	}
	@Input() set reset(done: boolean) {
		if (done) {
			const initialData = this.storedLabTestParamsProvider.getParams();
			this.formGroup.reset(initialData);
		}
	}

	@Output() formChangeEventResult = new EventEmitter<StemDegsForm>();
	constructor(
		private stemDegsTestCalculatorService: StemDegsTestCalculatorService,
		private fb: FormBuilder,
		private storedLabTestParamsProvider: StoredLabTestParamsProvider) {
		this.formGroup = FormBuilderHelper.buildFormFromMapStore<keyof StemDegsForm, unknown, unknown>(stemDegsFormControlDescriptor, fb);
		const initialData = this.storedLabTestParamsProvider.getParams();
		if (initialData) {
			this.formGroup.patchValue(initialData);
		}
	}

	ngOnInit(): void {
		this.formGroup.valueChanges.subscribe(() => {
			this.stemDegsTestCalculatorService.calculate(this.formGroup.value);
		});
	}

	public save() {
		this.submittedInvalid = this.formGroup.invalid;
		if (this.formGroup.valid) {
			this.formChangeEventResult.emit(this.formGroup.value);
		}
		this.formGroup.markAllAsTouched();
	}

}
