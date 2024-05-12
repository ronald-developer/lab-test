import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { FormBuilderHelper } from 'src/app/utils/form-builder-helper.utils';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { StemAuditForm, StemAuditFormControlDescriptor } from '../models/stem-audit-form-descriptor';
import { StemAuditTestCalculatorService } from '../services/stem-audit-test-calculator.service';

@Component({
	selector: 'app-stem-audit-form',
	templateUrl: './stem-audit-form.component.html'
})
export class StemAuditFormComponent implements OnInit {

	public formGroup!: FormGroup;
	public submittedInvalid!: boolean;
	@Input() isEdit!: boolean;
	@Input() set initialData(formData: StemAuditForm) {
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
	@Output() formChangeEventResult = new EventEmitter<StemAuditForm>();
	constructor(
		private fb: FormBuilder,
		private storedLabTestParamsProvider: StoredLabTestParamsProvider,
		private stemAuditTestCalculatorService: StemAuditTestCalculatorService) {
		this.formGroup = FormBuilderHelper.buildFormFromMapStore<keyof StemAuditForm, unknown, unknown>(StemAuditFormControlDescriptor, fb);
		const initialData = this.storedLabTestParamsProvider.getParams();
		if (initialData && !this.isEdit) {
			this.formGroup.patchValue(initialData);
		}
	}

	ngOnInit(): void {
		this.formGroup.valueChanges.subscribe(() => {
			this.stemAuditTestCalculatorService.calculate(this.formGroup.value);
		});
	}

	public save() {
		this.submittedInvalid = this.formGroup.invalid;
		if (this.formGroup.valid) {
			this.formChangeEventResult.emit(this.formGroup.value);
		}
		this.formGroup.markAllAsTouched();
	}

	private getFormControls(key: keyof StemAuditForm) {
		return this.formGroup.get(key) as AbstractControl;
	}

	public get isOperationOrderDropdownInvalid() {
		const ctrl = this.getFormControls('operationOrderId');
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

	public get isSampleTypeDropdownInvalid() {
		const ctrl = this.getFormControls('sampleType');
		return ctrl.invalid && ctrl.touched && ctrl.dirty || ctrl.invalid && ctrl.touched && this.submittedInvalid;
	};

	public get isShakerDropdownInvalid() {
		const ctrl = this.getFormControls('shakerId');
		return ctrl.invalid && ctrl.touched && ctrl.dirty || ctrl.invalid && ctrl.touched && this.submittedInvalid;
	};

	public get operationOrderId() {
		return this.getFormControls('operationOrderId').value;
	}
}
