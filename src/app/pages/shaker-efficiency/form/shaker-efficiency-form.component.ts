import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { FormBuilderHelper } from 'src/app/utils/form-builder-helper.utils';
import { ShakerEfficiencyForm, ShakerEfficiencyFormControlDescriptor } from '../models/shaker-efficiency-form-descriptor';
import { ShakerEfficiencyTestCalculatorService } from '../services/shaker-efficiency-test-calculator.service';

@Component({
    selector: 'app-shaker-efficiency-form',
    templateUrl: './shaker-efficiency-form.component.html'
})
export class ShakerEfficiencyFormComponent implements OnInit {

    public formGroup!: FormGroup;
    public submittedInvalid!: boolean;
    @Input() isEdit!: boolean;
    @Input() set initialData(formData: ShakerEfficiencyForm) {
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
    @Output() formChangeEventResult = new EventEmitter<ShakerEfficiencyForm>();
    constructor(
        private fb: FormBuilder,
        private storedLabTestParamsProvider: StoredLabTestParamsProvider,
        private shakerEfficiencyTestCalculatorService: ShakerEfficiencyTestCalculatorService) {
        this.formGroup = FormBuilderHelper.buildFormFromMapStore<keyof ShakerEfficiencyForm, unknown, unknown>(ShakerEfficiencyFormControlDescriptor, fb);

        const initialData = this.storedLabTestParamsProvider.getParams();
        if (initialData && !this.isEdit) {
            this.formGroup.patchValue(initialData);
        }
    }

    ngOnInit(): void {
        this.formGroup.valueChanges.subscribe(() => {
            this.shakerEfficiencyTestCalculatorService.calculate(this.formGroup.value);
        });
    }

    public save() {
        this.submittedInvalid = this.formGroup.invalid;
        if (this.formGroup.valid) {
            this.formChangeEventResult.emit(this.formGroup.value);
        }
        this.formGroup.markAllAsTouched();
    }

    private getFormControls(key: keyof ShakerEfficiencyForm) {
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

	public get isShakerDropdownInvalid() {
		const ctrl = this.getFormControls('shakerId');
		return ctrl.invalid && ctrl.touched && ctrl.dirty || ctrl.invalid && ctrl.touched && this.submittedInvalid;
	};

}
