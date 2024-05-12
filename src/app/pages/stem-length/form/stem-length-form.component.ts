import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { StemLengthForm, stemLengthFormControlDescriptor } from '../models/stem-length-form-descriptor';
import { StemLengthTestCalculatorService } from '../services/stem-length-test-calculator.service';
import { FormBuilderHelper } from './../../../utils/form-builder-helper.utils';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';

@Component({
	selector: 'app-stem-length-form',
	templateUrl: './stem-length-form.component.html'
})
export class StemLengthFormComponent implements OnInit {
	public formGroup!: FormGroup;
	public submittedInvalid!: boolean;
	@Input() isEdit!: boolean;
	@Input() set initialData(formData: StemLengthForm) {
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
	@Output() formChangeEventResult = new EventEmitter<StemLengthForm>();

	constructor(
		private fb: FormBuilder,
		private storedLabTestParamsProvider: StoredLabTestParamsProvider,
		private stemLengthTestCalculatorService: StemLengthTestCalculatorService) {
		this.formGroup = FormBuilderHelper.buildFormFromMapStore(stemLengthFormControlDescriptor, fb);
		const initialData = this.storedLabTestParamsProvider.getParams();
		if (initialData && !this.isEdit) {
			this.formGroup.patchValue(initialData);
		}
	}

	ngOnInit(): void {
		this.formGroup.valueChanges.subscribe(() => {
			this.stemLengthTestCalculatorService.calculate(this.formGroup.value);
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

	private getFormControls(key: keyof StemLengthForm) {
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
