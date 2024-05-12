import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NtrmGreenForm, NtrmGreenFormControlDescriptor } from '../models/ntrm-green-form-descriptor';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { FormBuilderHelper } from 'src/app/utils/form-builder-helper.utils';
import { NtrmGreenTestCalculatorService } from '../services/ntrm-green-test-calculator.service';

@Component({
	selector: 'app-ntrm-green-form',
	templateUrl: './ntrm-green-form.component.html'
})
export class NtrmGreenFormComponent implements OnInit {

	public formGroup!: FormGroup;
	public submittedInvalid!: boolean;
	@Input() isEdit!: boolean;
	@Input() set initialData(formData: NtrmGreenForm) {
		if (formData) {
			this.formGroup.patchValue(formData);
		}
	}
	@Input() set reset(done: boolean) {
		if (done) {
			this.setForm();
		}
	}
	@Output() formChangeEventResult = new EventEmitter<NtrmGreenForm>();
	constructor(
		private fb: FormBuilder,
		private storedLabTestParamsProvider: StoredLabTestParamsProvider,
		private ntrmGreenTestCalculatorService: NtrmGreenTestCalculatorService) {
		this.setForm();
	}

	private setForm() {
		this.formGroup = FormBuilderHelper.buildFormFromMapStore<keyof NtrmGreenForm, unknown, unknown>(NtrmGreenFormControlDescriptor, this.fb);

		const initialData = this.storedLabTestParamsProvider.getParams();
		if (initialData && !this.isEdit) {
			this.formGroup.patchValue(initialData);
		}
	}

	ngOnInit(): void {
		this.formGroup.valueChanges.subscribe(() => {
			this.ntrmGreenTestCalculatorService.calculate(this.formGroup.value);
		});
	}


    public barcodeScanned(data: string) {
        if (data && data.length) {
            this.formGroup.get('baleNo')?.setValue(data);
        }
    }

	public save() {
		this.submittedInvalid = this.formGroup.invalid;
		if (this.formGroup.valid) {
			this.formChangeEventResult.emit(this.formGroup.value);
		}
		this.formGroup.markAllAsTouched();
	}

	private getFormControls(key: keyof NtrmGreenForm) {
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
