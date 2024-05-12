import { Validators } from '@angular/forms';
import { RequestInlineDataTestEntry } from '../../../api-services/lab-tests/inline-data-test-api/models/request-inline-data-test-entry';
import { FormControlValueDescriptor } from '../../../shared/models/form-control-value-descriptor';
export type InlineDataForm = RequestInlineDataTestEntry & { entryTime: Date }

export const InlineDataFormControlDescriptor = new Map<keyof InlineDataForm, FormControlValueDescriptor<unknown, unknown>>([
    ['operationOrderId', { value: null, validators: [Validators.required] }],
    ['shiftType', { value: null, validators: [Validators.required] }],
    ['entryDate', { value: null, validators: [Validators.required] }],
    ['entryTime', { value: null, validators: [Validators.required] }],
    ['blendingMoisture', { value: 0, validators: [] }],
    ['firstOrderingMoisture', { value: 0, validators: [] }],
    ['secondOrderingMoisture', { value: 0, validators: [] }],
    ['tipsOrderingMoisture', { value: 0, validators: [] }],
    ['beforeRedryingMoisture', { value: 0, validators: [] }],
    ['rightCoolerMoisture', { value: 0, validators: [] }],
    ['leftCoolerMoisture', { value: 0, validators: [] }],
    ['redryerEndMoisture', { value: 0, validators: [] }],
    ['firstOrderingTemp', { value: 0, validators: [] }],
    ['secondOderingTemp', { value: 0, validators: [] }],
    ['tipsOrderingTemp', { value: 0, validators: [] }],
    ['firstRedryingZoneTemp', { value: 0, validators: [] }],
    ['secondRedryingZoneTemp', { value: 0, validators: [] }],
    ['thirdRedryingZoneTemp', { value: 0, validators: [] }],
    ['fourthRedryingZoneTemp', { value: 0, validators: [] }],
    ['coolerTemp', { value: 0, validators: [] }],
    ['redryerEndTemp', { value: 0, validators: [] }],
    ['firstOrderingNIR', { value: 0, validators: [] }],
    ['secondOrderingNIR', { value: 0, validators: [] }],
    ['tipsOrderingNIR', { value: 0, validators: [] }]
]);
