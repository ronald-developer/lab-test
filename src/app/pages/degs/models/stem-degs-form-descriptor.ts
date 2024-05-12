import { Validators } from '@angular/forms';
import { RequestStemDegsTestEntry } from 'src/app/api-services/lab-tests/degs-test-api/models/request-stem-degs-test-entry';
import { FormControlValueDescriptor } from '../../../shared/models/form-control-value-descriptor';
export type StemDegsForm = RequestStemDegsTestEntry

/**
 * Stem degs form definition
 */
export const stemDegsFormControlDescriptor = new Map<keyof StemDegsForm, FormControlValueDescriptor<unknown, unknown>>([
	['stemSampleWeight', { value: 0, validators: [Validators.required] }],
	['stemObj', { value: null, validators: [Validators.required] }],
    ['stemSevenMesh', { value: null, validators: [Validators.required] }],
	['stemTwelveMesh', { value: null, validators: [Validators.required] }],
	['stemPan', { value: null, validators: [Validators.required] }]
]);
