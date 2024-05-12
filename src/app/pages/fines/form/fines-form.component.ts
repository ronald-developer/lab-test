import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { FormBuilderHelper } from 'src/app/utils/form-builder-helper.utils';
import { FinesForm, FinesFormControlDescriptor } from '../models/fines-form-descriptor';
import { FinesTestCalculatorService } from '../services/fines-test-calculator.service';

@Component({
	selector: 'app-fines-form',
	templateUrl: './fines-form.component.html'
})
export class FinesFormComponent implements OnInit {
	public formGroup!: FormGroup;
	public submittedInvalid!: boolean;
	@Input() isEdit!: boolean;
	@Input() set initialData(formData: FinesForm) {
		if (formData) {
			this.formGroup.patchValue(formData);
		}
	}
	@Input() set reset(done: boolean) {
		if (done) {
			this.setForm();
		}
	}
	@Output() formChangeEventResult = new EventEmitter<FinesForm>();
	constructor(
		private fb: FormBuilder,
		private finesTestCalculatorService: FinesTestCalculatorService,
		private storedLabTestParamsProvider: StoredLabTestParamsProvider) {
		this.setForm();
	}

	private setForm() {
		this.formGroup = FormBuilderHelper.buildFormFromMapStore<keyof FinesForm, unknown, unknown>(FinesFormControlDescriptor, this.fb);
		const initialData = this.storedLabTestParamsProvider.getParams();
		if (initialData && !this.isEdit) {
			this.formGroup.patchValue(initialData);
		}
	}

	ngOnInit(): void {
		this.formGroup.valueChanges.subscribe(() => {
            this.finesTestCalculatorService.calculate(this.formGroup.value);
        });
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

	private getFormControls(key: keyof FinesForm) {
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
