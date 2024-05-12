import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { FlagOnStemTestCalculatorService } from '../services/flag-on-stem-test-calculator.service';
import { FormBuilderHelper } from './../../../utils/form-builder-helper.utils';
import { FlagOnStemForm, flagOnStemFormControlDescriptor } from './../models/flag-on-stem-form-descriptor';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
@Component({
    selector: 'app-flag-on-stem-form',
    templateUrl: './flag-on-stem-form.component.html'
})
export class FlagOnStemFormComponent implements OnInit {

    public formGroup!: FormGroup;
    public submittedInvalid!: boolean;
    @Input() isEdit!: boolean;
    @Input() set initialData(formData: FlagOnStemForm) {
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
    @Output() formChangeEventResult = new EventEmitter<FlagOnStemForm>();
    constructor(
        private fb: FormBuilder,
        private flagOnStemTestCalculatorService: FlagOnStemTestCalculatorService,
        private storedLabTestParamsProvider: StoredLabTestParamsProvider) {
        this.formGroup = FormBuilderHelper.buildFormFromMapStore<keyof FlagOnStemForm, unknown, unknown>(flagOnStemFormControlDescriptor, fb);
        const initialData = this.storedLabTestParamsProvider.getParams();
        if(initialData){
            this.formGroup.patchValue(initialData);
        }
    }


    ngOnInit(): void {
        this.formGroup.valueChanges.subscribe(() => {
            this.flagOnStemTestCalculatorService.calculate(this.formGroup.value);
        });
    }

    public save() {
        this.submittedInvalid = this.formGroup.invalid;
        if (this.formGroup.valid) {
            this.formChangeEventResult.emit(this.formGroup.value);
        }
        this.formGroup.markAllAsTouched();
    }

    private getFormControls(key: keyof FlagOnStemForm) {
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
