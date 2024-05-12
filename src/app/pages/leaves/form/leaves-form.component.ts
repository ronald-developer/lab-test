import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LeavesTestCalculatorService } from '../services/leaves-test-calculator.service';
import { FormBuilderHelper } from './../../../utils/form-builder-helper.utils';
import { LeavesForm, leavesFormControlDescriptor } from './../models/leaves-form-descriptor';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';

@Component({
	selector: 'app-leaves-form',
	templateUrl: './leaves-form.component.html'
})
export class LeavesFormComponent implements OnInit {

	public formGroup!: FormGroup;
	public submittedInvalid!: boolean;
	@Input() isEdit!: boolean;
	@Input() set initialData(formData: LeavesForm) {
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
	@Output() formChangeEventResult = new EventEmitter<LeavesForm>();
	constructor(
		private fb: FormBuilder,
		private storedLabTestParamsProvider: StoredLabTestParamsProvider,
		private leavesTestCalculatorService: LeavesTestCalculatorService) {
		this.formGroup = FormBuilderHelper.buildFormFromMapStore<keyof LeavesForm, unknown, unknown>(leavesFormControlDescriptor, fb);
		const initialData = this.storedLabTestParamsProvider.getParams();
		if (initialData && !this.isEdit) {
			this.formGroup.patchValue(initialData);
		}
	}

	ngOnInit(): void {
		this.formGroup.valueChanges.subscribe(() => {
			this.leavesTestCalculatorService.calculate(this.formGroup.value);
		});
	}

	public save() {
		this.submittedInvalid = this.formGroup.invalid;
		if (this.formGroup.valid) {
			this.formChangeEventResult.emit(this.formGroup.value);
		}
		this.formGroup.markAllAsTouched();
	}

	private getFormControls(key: keyof LeavesForm) {
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

	public get isEntryDateDropdownInvalid() {
		const ctrl = this.getFormControls('entryDate');
		return ctrl.invalid && ctrl.touched && ctrl.dirty || ctrl.invalid && ctrl.touched && this.submittedInvalid;
	};

}
