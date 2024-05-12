import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { DegsForm, degsFormControlDescriptor } from '../models/degs-form-descriptor';
import { FormBuilderHelper } from 'src/app/utils/form-builder-helper.utils';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { DegsTestCalculatorService } from '../services/degs-test-calculator.service';

@Component({
	selector: 'app-degs-form',
	templateUrl: './degs-form.component.html'
})
export class DegsFormComponent implements OnInit {

	public formGroup!: FormGroup;
	public submittedInvalid!: boolean;
	@Input() isEdit!: boolean;
	@Input() set initialData(formData: DegsForm) {
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

	@Output() formChangeEventResult = new EventEmitter<DegsForm>();
	constructor(
		private degsTestCalculatorService: DegsTestCalculatorService,
		private fb: FormBuilder,
		private storedLabTestParamsProvider: StoredLabTestParamsProvider) {
		this.formGroup = FormBuilderHelper.buildFormFromMapStore<keyof DegsForm, unknown, unknown>(degsFormControlDescriptor, fb);
		const initialData = this.storedLabTestParamsProvider.getParams();
		if (initialData) {
			this.formGroup.patchValue(initialData);
		}
	}

	ngOnInit(): void {
		this.formGroup.valueChanges.subscribe(() => {
			this.degsTestCalculatorService.calculate(this.formGroup.value);
		});
	}

	public save() {
		this.submittedInvalid = this.formGroup.invalid;
		if (this.formGroup.valid) {
			this.formChangeEventResult.emit(this.formGroup.value);
		}
		this.formGroup.markAllAsTouched();
	}

	private getFormControls(key: keyof DegsForm) {
		return this.formGroup.get(key) as AbstractControl;
	}

	public get isOperationOrderDropdownInvalid() {
		const ctrl = this.getFormControls('operationOrderId');
		return ctrl.invalid && ctrl.touched && ctrl.dirty || ctrl.invalid && ctrl.touched && this.submittedInvalid;
	};

	public get isShiftTypeDropdownInvalid() {
		const ctrl = this.getFormControls('shiftType');
		return ctrl.invalid && ctrl.touched && ctrl.dirty || ctrl.invalid && ctrl.touched && this.submittedInvalid;
	};

	public get isTestTypeDropdownInvalid() {
		const ctrl = this.getFormControls('testType');
		return ctrl.invalid && ctrl.touched && ctrl.dirty || ctrl.invalid && ctrl.touched && this.submittedInvalid;
	};

	public get isEntryDateDropdownInvalid() {
		const ctrl = this.getFormControls('entryDate');
		return ctrl.invalid && ctrl.touched && ctrl.dirty || ctrl.invalid && ctrl.touched && this.submittedInvalid;
	};

	public get isEntryTimeDropdownInvalid() {
		const ctrl = this.getFormControls('entryTime');
		return ctrl.invalid && ctrl.touched && ctrl.dirty || ctrl.invalid && ctrl.touched && this.submittedInvalid;
	};

}
