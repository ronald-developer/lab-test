import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { FormBuilderHelper } from 'src/app/utils/form-builder-helper.utils';
import { InlineHsForm, inlineHsFormControlDescriptor } from '../models/inline-hs-form-descriptor';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';

@Component({
	selector: 'app-inline-hs-form',
	templateUrl: './inline-hs-form.component.html'
})
export class InlineHsFormComponent implements OnInit {

	public formGroup!: FormGroup;
	public submittedInvalid!: boolean;
	@Input() isEdit!: boolean;
	@Input() set initialData(formData: InlineHsForm) {
		if (formData) {
			this.formGroup.patchValue(formData);
		}
	}
	@Input() set reset(done: boolean) {
		if (done) {
			this.setForm();
		}
	}
	@Output() formChangeEventResult = new EventEmitter<InlineHsForm>();
	constructor(private fb: FormBuilder, private storedLabTestParamsProvider: StoredLabTestParamsProvider) {
		this.setForm();
	}

	private setForm() {
		this.formGroup = FormBuilderHelper.buildFormFromMapStore<keyof InlineHsForm, unknown, unknown>(inlineHsFormControlDescriptor, this.fb);
		const initialData = this.storedLabTestParamsProvider.getParams();
		if (initialData && !this.isEdit) {
			const data = {
				"blendingMoisture": 0,
				"inclineConveyor": 0,
				"cylinderExitMoisture": 0,
				"cylinderExitTemperature": 0, ...initialData
			};
			this.formGroup.patchValue(data);
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

	private getFormControls(key: keyof InlineHsForm) {
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
