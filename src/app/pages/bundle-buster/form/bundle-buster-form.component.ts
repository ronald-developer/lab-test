import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { FormBuilderHelper } from 'src/app/utils/form-builder-helper.utils';
import { BundleBusterForm, bundleBusterFormControlDescriptor } from '../models/bundle-buster-form-descriptor';
import { BundleBusterTestCalculatorService } from '../services/bundle-buster-test-calculator.service';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';

@Component({
    selector: 'app-bundle-buster-form',
    templateUrl: './bundle-buster-form.component.html'
})
export class BundleBusterFormComponent implements OnInit {

    public formGroup!: FormGroup;
    public submittedInvalid!: boolean;
    @Input() isEdit!: boolean;
    @Input() set initialData(formData: BundleBusterForm) {
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
    @Output() formChangeEventResult = new EventEmitter<BundleBusterForm>();
    constructor(
        private fb: FormBuilder,
        private storedLabTestParamsProvider: StoredLabTestParamsProvider,
        private bundleBusterTestCalculatorService: BundleBusterTestCalculatorService) {
        this.formGroup = FormBuilderHelper.buildFormFromMapStore<keyof BundleBusterForm, unknown, unknown>(bundleBusterFormControlDescriptor, fb);

        const initialData = this.storedLabTestParamsProvider.getParams();
        if (initialData && !this.isEdit) {
            this.formGroup.patchValue(initialData);
        }
    }

    ngOnInit(): void {
        this.formGroup.valueChanges.subscribe(() => {
            this.bundleBusterTestCalculatorService.calculate(this.formGroup.value);
        });
    }

    public save() {
        this.submittedInvalid = this.formGroup.invalid;
        if (this.formGroup.valid) {
            this.formChangeEventResult.emit(this.formGroup.value);
        }
        this.formGroup.markAllAsTouched();
    }

    private getFormControls(key: keyof BundleBusterForm) {
        return this.formGroup.get(key) as AbstractControl;
    }

    public get isOperationOrderDropdownInvalid() {
        const ctrl = this.getFormControls('operationOrderId');
        return ctrl.invalid && ctrl.touched && ctrl.dirty || ctrl.invalid && ctrl.touched && this.submittedInvalid;
    };

    public get isPositionTypeDropdownInvalid() {
        const ctrl = this.getFormControls('positionType');
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
