import { Validators } from '@angular/forms';
import { RequestLooseLeafTestEntry } from '../../../api-services/lab-tests/loose-leaf-test-api/models/request-loose-leaf-test-entry';
import { FormControlValueDescriptor } from '../../../shared/models/form-control-value-descriptor';
import { LooseLeafValidationArgs } from './loose-leaf-form-validators';
export type LooseLeafForm = RequestLooseLeafTestEntry & { entryTime: Date }

export const looseLeafFormControlDescriptor = new Map<keyof LooseLeafForm, FormControlValueDescriptor<number, LooseLeafValidationArgs>>([
  ['operationOrderId', { value: null, validators: [Validators.required] }],
  ['shiftType', { value: null, validators: [Validators.required] }],
  ['entryDate', { value: null, validators: [Validators.required] }],
  ['entryTime', { value: null, validators: [Validators.required] }],
  ['sampleWeight', { value: null, validators: [Validators.required] }],
  ['overOneInch', { value: null, validators: [Validators.required] }],
  ['overHalfInch', { value: null, validators: [Validators.required] }],
  ['overOneFourthInch', { value: null, validators: [Validators.required] }],
  ['overOneEigthInch', { value: null, validators: [Validators.required] }],
  ['pan', { value: null, validators: [Validators.required] }]
]);
