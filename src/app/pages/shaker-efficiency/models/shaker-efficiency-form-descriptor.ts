import { Validators } from '@angular/forms';
import { FormControlValueDescriptor } from '../../../shared/models/form-control-value-descriptor';
import { RequestShakerEfficiencyTestEntry } from 'src/app/api-services/lab-tests/shaker-efficiency-test-api/models/request-shaker-efficiency-test-entry';
export type ShakerEfficiencyForm = RequestShakerEfficiencyTestEntry & { entryTime: Date }

export const ShakerEfficiencyFormControlDescriptor = new Map<keyof ShakerEfficiencyForm, FormControlValueDescriptor<unknown, unknown>>([
	['operationOrderId', { value: null, validators: [Validators.required] }],
	['shiftType', { value: null, validators: [Validators.required] }],
	['entryDate', { value: null, validators: [Validators.required] }],
	['entryTime', { value: null, validators: [Validators.required] }],
	['overOne', { value: null, validators: [Validators.required] }],
	['betweenHalfAndOne', { value: null, validators: [Validators.required] }],
	['betweenQuarterAndHalf', { value: null, validators: [Validators.required] }],
	['betweenEighthAndQuarter', { value: null, validators: [Validators.required] }],
	['lessThanEighth', { value: null, validators: [Validators.required] }],
	['shakerId', { value: null, validators: [Validators.required] }]
]);
