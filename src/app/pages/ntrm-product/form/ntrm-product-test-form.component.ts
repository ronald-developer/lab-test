import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { FormBuilderHelper } from 'src/app/utils/form-builder-helper.utils';
import { NtrmProductForm, ntrmProductDetailsFormControlDescriptor } from '../models/ntrm-product-form-descriptor';
import { NtrmProductTestCalculatorService } from '../services/ntrm-product-test-calculator.service';

@Component({
	selector: 'app-ntrm-product-test-form',
	templateUrl: './ntrm-product-test-form.component.html'
})
export class NtrmProductTestFormComponent implements OnInit {

	public formGroup!: FormGroup;
	public submittedInvalid!: boolean;
	@Input() isEdit!: boolean;
	@Input() set initialData(formData: NtrmProductForm) {
		if (formData) {
			this.formGroup.patchValue(formData);
		}
	}
	@Input() set reset(done: boolean) {
		if (done) {
			this.setForm();
		}
	}
	@Output() formChangeEventResult = new EventEmitter<NtrmProductForm>();
	constructor(
		private fb: FormBuilder,
		private ntrmProductTestCalculatorService: NtrmProductTestCalculatorService,
		private storedLabTestParamsProvider: StoredLabTestParamsProvider) {
		this.setForm();
	}

	ngOnInit(): void {
	}

	private setForm() {
		this.formGroup = FormBuilderHelper.buildFormFromMapStore<keyof NtrmProductForm, unknown, unknown>(ntrmProductDetailsFormControlDescriptor, this.fb);
		const initialData = this.storedLabTestParamsProvider.getParams();
		if (initialData && !this.isEdit) {
			this.formGroup.patchValue(initialData);
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

	public motherGradeCodeChanged(val:number) {
		this.getFormControls('motherGradeId').setValue(val);
	}

	public getFormControls(key: keyof NtrmProductForm) {
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

	public get isOperationOrderDropdownInvalid() {
		const ctrl = this.getFormControls('operationOrderId');
		return ctrl.invalid && ctrl.touched && ctrl.dirty || ctrl.invalid && ctrl.touched && this.submittedInvalid;
	};

	public get operationOrderId() {
		return this.getFormControls('operationOrderId').value;
	}
}
