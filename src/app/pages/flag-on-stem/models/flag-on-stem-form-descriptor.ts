import { FormControlValueDescriptor } from '../../../shared/models/form-control-value-descriptor';
import { Validators } from '@angular/forms';
import { RequestFlagOnStemTestEntry } from '../../../api-services/lab-tests/flag-on-stem-test-api/models/request-flag-on-stem-test-entry';
export type FlagOnStemForm = RequestFlagOnStemTestEntry & { entryTime: Date }

/**
 * Flag on stem form definition
 */
export const flagOnStemFormControlDescriptor = new Map<keyof FlagOnStemForm, FormControlValueDescriptor<unknown, unknown>>([
    ['operationOrderId', { value: null, validators: [Validators.required] }],
    ['shiftType', { value: null, validators: [Validators.required] }],
    ['entryDate', { value: null, validators: [Validators.required] }],
    ['entryTime', { value: null, validators: [Validators.required] }],
    ['sampleWeight', { value: null, validators: [Validators.required] }],
    ['attachedLamina', { value: null, validators: [Validators.required] }],
    ['freeLamina', { value: null, validators: [Validators.required] }]
]);
