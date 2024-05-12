import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { StemDiameterTestCalculatorService } from '../services/stem-diameter-test-calculator.service';
import { FormBuilderHelper } from './../../../utils/form-builder-helper.utils';
import { StemDiameterForm, stemDiameterFormControlDescriptor } from './../models/stem-diameter-form-descriptor';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';

@Component({
    selector: 'app-stem-diameter-form',
    templateUrl: './stem-diameter-form.component.html'
})
export class StemDiameterFormComponent implements OnInit {
    public formGroup!: FormGroup;
    public submittedInvalid!: boolean;
    @Input() isEdit!: boolean;
    @Input() set initialData(formData: StemDiameterForm) {
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
    @Output() formChangeEventResult = new EventEmitter<StemDiameterForm>();
    constructor(
        private fb: FormBuilder,
        private storedLabTestParamsProvider: StoredLabTestParamsProvider,
        private stemDiameterTestCalculatorService: StemDiameterTestCalculatorService) {
        this.formGroup = FormBuilderHelper.buildFormFromMapStore<keyof StemDiameterForm, unknown, unknown>(stemDiameterFormControlDescriptor, fb);
        const initialData = this.storedLabTestParamsProvider.getParams();
        if (initialData && !this.isEdit) {
            this.formGroup.patchValue(initialData);
        }
    }

    ngOnInit(): void {
        this.formGroup.valueChanges.subscribe(() => {
            this.stemDiameterTestCalculatorService.calculate(this.formGroup.value);
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

    private getFormControls(key: keyof StemDiameterForm) {
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

