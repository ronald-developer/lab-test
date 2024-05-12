import { FormControlValueDescriptor } from '../../../shared/models/form-control-value-descriptor';
import { Validators } from '@angular/forms';
import { RequestDensityTestEntry } from '../../../api-services/lab-tests/density-test-api/models/request-density-test-entry';
export type DensityForm = RequestDensityTestEntry & { entryTime: Date }

export const DensityFormControlDescriptor = new Map<keyof DensityForm, FormControlValueDescriptor<unknown, unknown>>([
    ['operationOrderId', { value: null, validators: [Validators.required] }],
    ['shiftType', { value: null, validators: [Validators.required] }],
    ['entryDate', { value: null, validators: [Validators.required] }],
    ['entryTime', { value: null, validators: [Validators.required] }],
    ['cartonNo', { value: null, validators: [Validators.required] }],
    ['chargerType', { value: null, validators: [Validators.required] }],
    ['l1', { value: null, validators: [Validators.required] }],
    ['l2', { value: null, validators: [Validators.required] }],
    ['l3', { value: null, validators: [Validators.required] }],
    ['c1', { value: null, validators: [Validators.required] }],
    ['c2', { value: null, validators: [Validators.required] }],
    ['c3', { value: null, validators: [Validators.required] }],
    ['r1', { value: null, validators: [Validators.required] }],
    ['r2', { value: null, validators: [Validators.required] }],
    ['r3', { value: null, validators: [Validators.required] }]
]);
