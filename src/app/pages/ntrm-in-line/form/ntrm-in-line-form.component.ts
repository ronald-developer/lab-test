import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { FormBuilderHelper } from 'src/app/utils/form-builder-helper.utils';
import { NtrmInLineDetailsForm as NtrmInLineForm, ntrmInLineDetailsFormControlDescriptor as ntrmInLineFormControlDescriptor } from '../models/ntrm-in-line-form-descriptor';

@Component({
	selector: 'app-ntrm-in-line-form',
	templateUrl: './ntrm-in-line-form.component.html'
})
export class NtrmInLineFormComponent {

	public formGroup!: FormGroup;
	public submittedInvalid!: boolean;
	@Input() isEdit!: boolean;
	@Input() set initialData(formData: NtrmInLineForm) {
		if (formData) {
			this.formGroup.patchValue(formData);
		}
	}
	@Input() set reset(done: boolean) {
		if (done) {
			const motherGradeId = this.getFormControls('motherGradeId').value;
			const entryTime = this.getFormControls('entryTime').value;
			this.setForm(motherGradeId, entryTime);
		}
	}

	@Output() formChangeEventResult = new EventEmitter<NtrmInLineForm>();
	constructor(
		private fb: FormBuilder,
		private storedLabTestParamsProvider: StoredLabTestParamsProvider) {
		this.setForm();
	}

	private setForm(motherGradeId?: number, entryTime?: Date) {
		this.formGroup = FormBuilderHelper.buildFormFromMapStore<keyof NtrmInLineForm, unknown, unknown>(ntrmInLineFormControlDescriptor, this.fb);
		const initialData = this.storedLabTestParamsProvider.getParams();
		if (initialData && !this.isEdit) {
			this.formGroup.patchValue({ ...initialData, motherGradeId: motherGradeId, entryTime: entryTime });
		}
	}

	public save() {
		this.submittedInvalid = this.formGroup.invalid;
		if (this.formGroup.valid) {
			this.formChangeEventResult.emit(this.formGroup.value);
		}
		this.formGroup.markAllAsTouched();
	}

	public productTypeChanged() {
		this.getFormControls('packingGradeId').setValue('');
	}


	public getFormControls(key: keyof NtrmInLineForm) {
		return this.formGroup.get(key) as AbstractControl;
	}


	public get isPackingGradeDropdownInvalid() {
		const ctrl = this.getFormControls('packingGradeId');
		return ctrl.invalid && ctrl.touched && ctrl.dirty || ctrl.invalid && ctrl.touched && this.submittedInvalid;
	};

	public get isProductTypeDropdownInvalid() {
		const ctrl = this.getFormControls('productTypeId');
		return ctrl.invalid && ctrl.touched && ctrl.dirty || ctrl.invalid && ctrl.touched && this.submittedInvalid;
	};

	public get isNtrmLocationDropdownInvalid() {
		const ctrl = this.getFormControls('ntrmLocationId');
		return ctrl.invalid && ctrl.touched && ctrl.dirty || ctrl.invalid && ctrl.touched && this.submittedInvalid;
	};

	public get isTestUnitOfMeasureDropdownInvalid() {
		const ctrl = this.getFormControls('testUnitOfMeasure');
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

	public get productTypeId() {
		return this.getFormControls('productTypeId').value;
	}

	public motherGradeCodeChanged(val: number) {
		this.getFormControls('motherGradeId').setValue(val);
	}

	public get isOperationOrderDropdownInvalid() {
		const ctrl = this.getFormControls('operationOrderId');
		return ctrl.invalid && ctrl.touched && ctrl.dirty || ctrl.invalid && ctrl.touched && this.submittedInvalid;
	};

	public get operationOrderId() {
		return this.getFormControls('operationOrderId').value;
	}
}
