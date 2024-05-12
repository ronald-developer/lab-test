import { RequestFinesTestEntry } from 'src/app/api-services/lab-tests/fines-test-api/models/request-fines-test-entry';
import { FormControlValueDescriptor } from '../../../shared/models/form-control-value-descriptor';
import { Validators } from '@angular/forms';
export type FinesForm = RequestFinesTestEntry & { entryTime: Date }

export const FinesFormControlDescriptor = new Map<keyof FinesForm, FormControlValueDescriptor<unknown, unknown>>([
    ['operationOrderId', { value: null, validators: [Validators.required] }],
    ['packingGradeId', { value: null, validators: [Validators.required] }],
    ['shiftType', { value: null, validators: [Validators.required] }],
    ['entryDate', { value: null, validators: [Validators.required] }],
    ['entryTime', { value: null, validators: [Validators.required] }],
    ['finalScreenSize', { value: 8, validators: [Validators.required] }],
    ['over4', { value: 0, validators: [Validators.required] }],
	['over8', { value: 0, validators: [Validators.required] }],
	['over16', { value: 0, validators: [Validators.required] }],
	['over32', { value: 0, validators: [Validators.required] }],
	['pan', { value: 0, validators: [Validators.required] }]
]);
