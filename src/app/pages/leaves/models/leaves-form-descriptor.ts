import { Validators } from '@angular/forms';
import { RequestLeavesTestEntry } from '../../../api-services/lab-tests/leaves-test-api/models/request-leaves-test-entry';
import { FormControlValueDescriptor } from '../../../shared/models/form-control-value-descriptor';
export type LeavesForm = RequestLeavesTestEntry

export const leavesFormControlDescriptor = new Map<keyof LeavesForm, FormControlValueDescriptor<unknown, unknown>>([
    ['operationOrderId', { value: null, validators: [Validators.required] }],
    ['shiftType', { value: null, validators: [Validators.required] }],
    ['entryDate', { value: null, validators: [Validators.required] }],
    ['sampleWeight', { value: null, validators: [Validators.required] }],
    ['noOfLeaves', { value: null, validators: [Validators.required] }],
    ['laminaWeight', { value: null, validators: [Validators.required] }],
    ['stemWeight', { value: null, validators: [Validators.required] }]
]);
