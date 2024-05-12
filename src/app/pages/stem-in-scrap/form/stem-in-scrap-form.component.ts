import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { StemInScrapTestCalculatorService } from '../services/stem-in-scrap-test-calculator.service';
import { FormBuilderHelper } from './../../../utils/form-builder-helper.utils';
import { StemInScrapForm, StemInScrapFormControlDescriptor } from './../models/stem-in-scrap-form-descriptor';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';

@Component({
    selector: 'app-stem-in-scrap-form',
    templateUrl: './stem-in-scrap-form.component.html'
})
export class StemInScrapFormComponent implements OnInit {
    public formGroup!: FormGroup;
    public submittedInvalid!: boolean;
    @Input() isEdit!: boolean;
    @Input() set initialData(formData: StemInScrapForm) {
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
    @Output() formChangeEventResult = new EventEmitter<StemInScrapForm>();
    constructor(
        private fb: FormBuilder,
        private stemInScrapTestCalculatorService: StemInScrapTestCalculatorService,
        private storedLabTestParamsProvider: StoredLabTestParamsProvider) {
        this.formGroup = FormBuilderHelper.buildFormFromMapStore<keyof StemInScrapForm, unknown, unknown>(StemInScrapFormControlDescriptor, fb);
        const initialData = this.storedLabTestParamsProvider.getParams();
        if(initialData && !this.isEdit){
            this.formGroup.patchValue(initialData);
        }

    }

    ngOnInit(): void {
        this.formGroup.valueChanges.subscribe(() => {
            this.stemInScrapTestCalculatorService.calculate(this.formGroup.value);
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

    private getFormControls(key: keyof StemInScrapForm) {
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

