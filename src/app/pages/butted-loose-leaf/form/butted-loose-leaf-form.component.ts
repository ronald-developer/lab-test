import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ButtedLooseLeafTestCalculatorService } from '../services/butted-loose-leaf-test-calculator.service';
import { FormBuilderHelper } from './../../../utils/form-builder-helper.utils';
import { ButtedLooseLeafForm, buttedLooseLeafFormControlDescriptor } from './../models/butted-loose-leaf-form-descriptor';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';

@Component({
  selector: 'app-butted-loose-leaf-form',
  templateUrl: './butted-loose-leaf-form.component.html'
})
export class ButtedLooseLeafFormComponent implements OnInit {

  public formGroup!: FormGroup;
  public submittedInvalid!: boolean;
  public buttLengthFieldsCount = Array(10).fill(0).map((x, i) => i + 1);
  @Input() isEdit!: boolean;
  @Input() set initialData(formData: ButtedLooseLeafForm) {
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
  @Output() formChangeEventResult = new EventEmitter<ButtedLooseLeafForm>();
  constructor(
    private fb: FormBuilder,
    private storedLabTestParamsProvider: StoredLabTestParamsProvider,
    private buttedLooseLeafTestCalculatorService: ButtedLooseLeafTestCalculatorService) {
    this.formGroup = FormBuilderHelper.buildFormFromMapStore<keyof ButtedLooseLeafForm, unknown, unknown>(buttedLooseLeafFormControlDescriptor, fb);
    const initialData = this.storedLabTestParamsProvider.getParams();
    if (initialData && !this.isEdit) {
      this.formGroup.patchValue(initialData);
    }
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe(() => {
      this.buttedLooseLeafTestCalculatorService.calculate(this.formGroup.value);
    });
  }


  public save() {
    this.submittedInvalid = this.formGroup.invalid;
    if (this.formGroup.valid) {
      this.formChangeEventResult.emit(this.formGroup.value);
    }
    this.formGroup.markAllAsTouched();
  }

  private getFormControls(key: keyof ButtedLooseLeafForm) {
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
