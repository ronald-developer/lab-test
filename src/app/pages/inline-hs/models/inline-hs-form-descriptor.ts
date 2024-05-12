import { Validators } from '@angular/forms';
import { RequestInlineHsTestEntry } from '../../../api-services/lab-tests/inline-hs-test-api/models/request-inline-hs-test-entry';
import { FormControlValueDescriptor } from '../../../shared/models/form-control-value-descriptor';
export type InlineHsForm = RequestInlineHsTestEntry & { entryTime: Date }

export const inlineHsFormControlDescriptor = new Map<keyof InlineHsForm, FormControlValueDescriptor<unknown, unknown>>([
    ['operationOrderId', { value: null, validators: [Validators.required] }],
    ['shiftType', { value: null, validators: [Validators.required] }],
    ['entryDate', { value: null, validators: [Validators.required] }],
    ['entryTime', { value: null, validators: [Validators.required] }],
    ['blendingMoisture', { value: 0, validators: [] }],
    ['inclineConveyor', { value: 0, validators: [] }],
    ['cylinderExitMoisture', { value: 0, validators: [] }],
    ['cylinderExitTemperature', { value: 0, validators: [] }]
]);
