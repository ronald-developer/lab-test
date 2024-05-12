import { Validators } from '@angular/forms';
import { FormControlValueDescriptor } from 'src/app/shared/models/form-control-value-descriptor';
import { RequestStemLengthEntry } from '../../../api-services/lab-tests/stem-length-test-api/models/request-stem-length-entry';
import { ValidationArgs } from './stem-length-form-validators';
export type StemLengthForm = RequestStemLengthEntry & { entryTime: Date }

export const stemLengthFormControlDescriptor = new Map<keyof StemLengthForm, FormControlValueDescriptor<number, ValidationArgs>>([
	['operationOrderId', { value: null, validators: [Validators.required] }],
	['packingGradeId', { value: null, validators: [Validators.required] }],
	['shiftType', { value: null, validators: [Validators.required] }],
	['entryDate', { value: null, validators: [Validators.required] }],
	['entryTime', { value: null, validators: [Validators.required] }],
	['lessThanPoint5', { value: null, validators: [Validators.required] }],
	['betweenPoint5And1', { value: null, validators: [Validators.required] }],
	['between1And1Point5', { value: null, validators: [Validators.required] }],
	['between1Point5And2', { value: null, validators: [Validators.required] }],
	['between2And2Point5', { value: null, validators: [Validators.required] }],
	['between2Point5And3', { value: null, validators: [Validators.required] }],
	['between3And3Point5', { value: null, validators: [Validators.required] }],
	['between3Point5And4', { value: null, validators: [Validators.required] }],
	['moreThan4', { value: null, validators: [Validators.required] }],
]);
