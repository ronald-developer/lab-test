import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { FormBuilderHelper } from '../../../utils/form-builder-helper.utils';
import { InlineDataForm, InlineDataFormControlDescriptor } from '../models/inline-data-form-descriptor';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';

@Component({
	selector: 'app-inline-data-form',
	templateUrl: './inline-data-form.component.html'
})
export class InlineDataFormComponent implements OnInit {

	public formGroup!: FormGroup;
	public submittedInvalid!: boolean;
	@Input() isEdit!: boolean;
	@Input() set initialData(formData: InlineDataForm) {
		if (formData) {
			this.formGroup.patchValue(formData);
		}
	}
	@Input() set reset(done: boolean) {
		if (done) {
			const initialData = this.storedLabTestParamsProvider.getParams();
			const data = {
				"blendingMoisture": 0,
				"firstOrderingMoisture": 0,
				"secondOrderingMoisture": 0,
				"tipsOrderingMoisture": 0,
				"beforeRedryingMoisture": 0,
				"rightCoolerMoisture": 0,
				"leftCoolerMoisture": 0,
				"redryerEndMoisture": 0,
				"firstOrderingTemp": 0,
				"secondOderingTemp": 0,
				"tipsOrderingTemp": 0,
				"firstRedryingZoneTemp": 0,
				"secondRedryingZoneTemp": 0,
				"thirdRedryingZoneTemp": 0,
				"fourthRedryingZoneTemp": 0,
				"coolerTemp": 0,
				"redryerEndTemp": 0,
				"firstOrderingNIR": 0,
				"secondOrderingNIR": 0,
				"tipsOrderingNIR": 0, ...initialData
			};

			this.formGroup.reset(data);
		}
	}
	@Output() formChangeEventResult = new EventEmitter<InlineDataForm>();
	constructor(
		private fb: FormBuilder,
		private storedLabTestParamsProvider: StoredLabTestParamsProvider) {
		this.formGroup = FormBuilderHelper.buildFormFromMapStore<keyof InlineDataForm, unknown, unknown>(InlineDataFormControlDescriptor, fb);
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

	private getFormControls(key: keyof InlineDataForm) {
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

	public get isEntryTimeDropdownInvalid() {
		const ctrl = this.getFormControls('entryTime');
		return ctrl.invalid && ctrl.touched && ctrl.dirty || ctrl.invalid && ctrl.touched && this.submittedInvalid;
	};

}
