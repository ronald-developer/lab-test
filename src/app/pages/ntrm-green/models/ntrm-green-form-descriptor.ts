import { Validators } from '@angular/forms';

import { FormControlValueDescriptor } from '../../../shared/models/form-control-value-descriptor';
import { RequestNtrmGreenTestEntry } from 'src/app/api-services/lab-tests/ntrm-green-test-api/models/request-ntrm-green-test-entry';
export type NtrmGreenForm = RequestNtrmGreenTestEntry & { entryTime: Date; }

export const NtrmGreenFormControlDescriptor = new Map<keyof NtrmGreenForm, FormControlValueDescriptor<unknown, unknown>>([
	['operationOrderId', { value: null, validators: [Validators.required] }],
	['shiftType', { value: null, validators: [Validators.required] }],
	['entryDate', { value: null, validators: [Validators.required] }],
	['entryTime', { value: null, validators: [Validators.required] }],
	['baleNo', { value: null, validators: [Validators.required] }],
	['baleWeight', { value: null, validators: [Validators.required] }],
	['category1Mineral', { value: 0, validators: [Validators.required] }],
	['category1Synthetic', { value: 0, validators: [Validators.required] }],
	['category2Natural', { value: 0, validators: [Validators.required] }],
	['category2NonSynthetic', { value: 0, validators: [Validators.required] }],
	['category2Organic', { value: 0, validators: [Validators.required] }]
]);
