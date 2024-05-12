import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { FormBuilderHelper } from 'src/app/utils/form-builder-helper.utils';
import { SandForm, SandFormControlDescriptor } from '../models/sand-form-descriptor';
import { SandTestCalculatorService } from '../services/sand-test-calculator.service';

@Component({
	selector: 'app-sand-form',
	templateUrl: './sand-form.component.html'
})
export class SandFormComponent implements OnInit {

	public formGroup!: FormGroup;
	public submittedInvalid!: boolean;
	@Input() isEdit!: boolean;
	@Input() set initialData(formData: SandForm) {
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
	@Output() formChangeEventResult = new EventEmitter<SandForm>();
	constructor(
		private fb: FormBuilder,
		private sandTestCalculatorService: SandTestCalculatorService,
		private storedLabTestParamsProvider: StoredLabTestParamsProvider,
		private detector: ChangeDetectorRef) {
		this.formGroup = FormBuilderHelper.buildFormFromMapStore<keyof SandForm, unknown, unknown>(SandFormControlDescriptor, fb);
		const initialData = this.storedLabTestParamsProvider.getParams();
		if (initialData && !this.isEdit) {
			this.formGroup.patchValue(initialData);
		}
	}

	ngOnInit(): void {
		this.formGroup.valueChanges.subscribe(() => {
			this.sandTestCalculatorService.calculate(this.formGroup.value);
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
		this.getFormControls('productId').setValue('');
	}

	public productTypeChanged() {
		this.getFormControls('packingGradeId').setValue('');
	}

	private getFormControls(key: keyof SandForm) {
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

	public get isProductTypeDropdownInvalid() {
		const ctrl = this.getFormControls('productId');
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

	public get productId() {
		return this.getFormControls('productId').value;
	}

}
