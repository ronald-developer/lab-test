import { RequestDegsTestEntry } from 'src/app/api-services/lab-tests/degs-test-api/models/request-degs-test-entry';
import { FormControlValueDescriptor } from '../../../shared/models/form-control-value-descriptor';
import { Validators } from '@angular/forms';
export type DegsForm = RequestDegsTestEntry & { entryTime: Date }

/**
 * Degs form definition
 */
export const degsFormControlDescriptor = new Map<keyof DegsForm, FormControlValueDescriptor<unknown, unknown>>([
    ['operationOrderId', { value: null, validators: [Validators.required] }],
    ['shiftType', { value: null, validators: [Validators.required] }],
    ['entryDate', { value: null, validators: [Validators.required] }],
    ['entryTime', { value: null, validators: [Validators.required] }],
    ['sampleWeight', { value: null, validators: [Validators.required] }],
	['cartonNo', { value: null, validators: [Validators.required] }],
    ['overOne', { value: null, validators: [Validators.required] }],
	['overHalf', { value: null, validators: [Validators.required] }],
	['overQuarter', { value: null, validators: [Validators.required] }],
	['overEighth', { value: null, validators: [Validators.required] }],
	['testType', { value: null, validators: [Validators.required] }],
	['degsPan', { value: null, validators: [Validators.required] }],
]);
