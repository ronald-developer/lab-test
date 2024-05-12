import { FormControlValueDescriptor } from '../../../shared/models/form-control-value-descriptor';
import { Validators } from '@angular/forms';
import { RequestShortStemTestEntry } from './../../../api-services/lab-tests/short-stem-test-api/models/request-short-stem-test-entry';
/**
 * Short stem test form definition
 */
export type ShortStemForm = RequestShortStemTestEntry & { entryTime: Date }

export const shortStemFormControlDescriptor = new Map<keyof ShortStemForm, FormControlValueDescriptor<unknown, unknown>>([
	['operationOrderId', { value: null, validators: [Validators.required] }],
	['packingGradeId', { value: null, validators: [Validators.required] }],
	['shiftType', { value: null, validators: [Validators.required] }],
	['entryDate', { value: null, validators: [Validators.required] }],
	['entryTime', { value: null, validators: [Validators.required] }],
	['sampleWeight', { value: null, validators: [Validators.required] }],
	['obj', { value: null, validators: [Validators.required] }],
	['usNo7', { value: null, validators: [Validators.required] }],
	['usNo12', { value: null, validators: [Validators.required] }],
	['pan', { value: null, validators: [Validators.required] }],
	['screenType', { value: null, validators: [Validators.required] }]
]);
