import { Validators } from '@angular/forms';
import { RequestTipsTestEntry } from '../../../api-services/lab-tests/tips-test-api/models/request-tips-test-entry';
import { FormControlValueDescriptor } from '../../../shared/models/form-control-value-descriptor';
export type TipsForm = RequestTipsTestEntry & { entryTime: Date }

export const tipsFormControlDescriptor = new Map<keyof TipsForm, FormControlValueDescriptor<unknown, unknown>>([
    ['operationOrderId', { value: null, validators: [Validators.required] }],
    ['shiftType', { value: null, validators: [Validators.required] }],
    ['entryDate', { value: null, validators: [Validators.required] }],
    ['entryTime', { value: null, validators: [Validators.required] }],
    ['sampleWeight', { value: null, validators: [Validators.required] }],
    ['obj', { value: null, validators: [Validators.required] }],
    ['mesh7', { value: null, validators: [Validators.required] }],
    ['mesh12', { value: null, validators: [Validators.required] }],
    ['pan', { value: null, validators: [Validators.required] }]
]);
