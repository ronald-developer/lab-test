import { FormControlValueDescriptor } from '../../../shared/models/form-control-value-descriptor';
import { Validators } from '@angular/forms';
import { RequestStemInScrapTestEntry } from './../../../api-services/lab-tests/stem-in-scrap-test-api/models/request-stem-in-scrap-test-entry';
export type StemInScrapForm = RequestStemInScrapTestEntry & { entryTime: Date }

export const StemInScrapFormControlDescriptor = new Map<keyof StemInScrapForm, FormControlValueDescriptor<unknown, unknown>>([
	['operationOrderId', { value: null, validators: [Validators.required] }],
	['packingGradeId', { value: null, validators: [Validators.required] }],
	['shiftType', { value: null, validators: [Validators.required] }],
	['entryDate', { value: null, validators: [Validators.required] }],
	['entryTime', { value: null, validators: [Validators.required] }],
	['sampleWeight', { value: null, validators: [Validators.required] }],
	['stemInScrap', { value: null, validators: [Validators.required] }]
]);
