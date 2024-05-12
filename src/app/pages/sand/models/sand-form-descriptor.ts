import { RequestSandTestEntry } from 'src/app/api-services/lab-tests/sand-test-api/models/request-sand-test-entry';
import { FormControlValueDescriptor } from '../../../shared/models/form-control-value-descriptor';
import { Validators } from '@angular/forms';
export type SandForm = RequestSandTestEntry & { entryTime: Date }

export const SandFormControlDescriptor = new Map<keyof SandForm, FormControlValueDescriptor<unknown, unknown>>([
    ['operationOrderId', { value: null, validators: [Validators.required] }],
    ['packingGradeId', { value: null, validators: [Validators.required] }],
    ['shiftType', { value: null, validators: [Validators.required] }],
    ['entryDate', { value: null, validators: [Validators.required] }],
    ['entryTime', { value: null, validators: [Validators.required] }],
	['productId', { value: null, validators: [Validators.required] }],
    ['sampleWeight', { value: null, validators: [Validators.required] }],
    ['twelveMesh', { value: null, validators: [Validators.required] }],
    ['twentyMesh', { value: null, validators: [Validators.required] }],
	['fourtyMesh', { value: null, validators: [Validators.required] }],
	['pan', { value: null, validators: [Validators.required] }],
]);
