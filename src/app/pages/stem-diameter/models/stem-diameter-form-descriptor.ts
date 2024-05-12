import { FormControlValueDescriptor } from '../../../shared/models/form-control-value-descriptor';
import { Validators } from '@angular/forms';
import { RequestStemDiameterTestEntry } from './../../../api-services/lab-tests/stem-diameter-test-api/models/request-stem-diameter-test-entry';
export type StemDiameterForm = RequestStemDiameterTestEntry & { entryTime: Date }

export const stemDiameterFormControlDescriptor = new Map<keyof StemDiameterForm, FormControlValueDescriptor<unknown, unknown>>([
    ['operationOrderId', { value: null, validators: [Validators.required] }],
    ['packingGradeId', { value: null, validators: [Validators.required] }],
    ['shiftType', { value: null, validators: [Validators.required] }],
    ['entryDate', { value: null, validators: [Validators.required] }],
    ['entryTime', { value: null, validators: [Validators.required] }],
    ['obj', { value: null, validators: [Validators.required] }],
    ['usNo35', { value: null, validators: [Validators.required] }],
    ['pan', { value: null, validators: [Validators.required] }],
    ['screenType', { value: null, validators: [Validators.required] }]
]);
