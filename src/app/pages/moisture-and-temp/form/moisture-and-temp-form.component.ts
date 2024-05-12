import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MoistureAndTempTestForm, moistureAndTempTestFormControlDescriptor } from '../models/moisture-and-temp-form-descriptor';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { FormBuilderHelper } from 'src/app/utils/form-builder-helper.utils';
import { MoistureAndTempTestCalculatorService } from '../services/moisture-and-temp-test-calculator.service';

@Component({
  selector: 'app-moisture-and-temp-form',
  templateUrl: './moisture-and-temp-form.component.html'
})
export class MoistureAndTempFormComponent implements OnInit {

	public formGroup!: FormGroup;
	public submittedInvalid!: boolean;
	@Input() isEdit!: boolean;
	@Input() set initialData(formData: MoistureAndTempTestForm) {
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
	@Output() formChangeEventResult = new EventEmitter<MoistureAndTempTestForm>();
	constructor(
		private fb: FormBuilder,
		private moistureAndTempTestCalculatorService: MoistureAndTempTestCalculatorService,
		private storedLabTestParamsProvider: StoredLabTestParamsProvider) {
		this.formGroup = FormBuilderHelper.buildFormFromMapStore<keyof MoistureAndTempTestForm, unknown, unknown>(moistureAndTempTestFormControlDescriptor, fb);

		const initialData = this.storedLabTestParamsProvider.getParams();
		if (initialData && !this.isEdit) {
			this.formGroup.patchValue(initialData);
		}
	}

	ngOnInit(): void {
	}

	public save() {
		this.submittedInvalid = this.formGroup.invalid;
		if (this.formGroup.valid) {
			this.formChangeEventResult.emit(this.formGroup.value);
		}
		this.formGroup.markAllAsTouched();
	}

	public operationOrderChanged() {
		this.getFormControls('packingGradeId').setValue('');
	}

	public getFormControls(key: keyof MoistureAndTempTestForm) {
		return this.formGroup.get(key) as AbstractControl;
	}

	public get isOperationOrderDropdownInvalid() {
		const ctrl = this.getFormControls('operationOrderId');
		return ctrl.invalid && ctrl.touched && ctrl.dirty || ctrl.invalid && ctrl.touched && this.submittedInvalid;
	};

	public get isPackingGradeDropdownInvalid() {
		const ctrl = this.getFormControls('packingGradeId');
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

	public get isEntryTimeDropdownInvalid() {
		const ctrl = this.getFormControls('entryTime');
		return ctrl.invalid && ctrl.touched && ctrl.dirty || ctrl.invalid && ctrl.touched && this.submittedInvalid;
	};

	public get operationOrderId() {
		return this.getFormControls('operationOrderId').value;
	}

}
