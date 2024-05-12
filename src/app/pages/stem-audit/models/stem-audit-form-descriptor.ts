import { Validators } from '@angular/forms';
import { RequestStemAuditTestEntry } from 'src/app/api-services/lab-tests/stem-audit-test-api/models/request-stem-audit-test-entry';
import { FormControlValueDescriptor } from '../../../shared/models/form-control-value-descriptor';
export type StemAuditForm = RequestStemAuditTestEntry & { entryTime: Date }

export const StemAuditFormControlDescriptor = new Map<keyof StemAuditForm, FormControlValueDescriptor<unknown, unknown>>([
    ['operationOrderId', { value: null, validators: [Validators.required] }],
    ['containerNo', { value: null, validators: [Validators.required] }],
	['containerRange', { value: null, validators: [Validators.required] }],
    ['entryDate', { value: new Date(), validators: [Validators.required] }],
    ['entryTime', { value: null, validators: [Validators.required] }],
    ['sampleType', { value: null, validators: [Validators.required] }],
	['shakerId', { value: null, validators: [Validators.required] }],
    ['obj', { value: null, validators: [Validators.required] }],
    ['pan', { value: null, validators: [Validators.required] }],
    ['over7Mesh', { value: null, validators: [Validators.required] }],
    ['over12Mesh', { value: null, validators: [Validators.required] }],
    ['totalStem', { value: null, validators: [Validators.required] }]
]);
