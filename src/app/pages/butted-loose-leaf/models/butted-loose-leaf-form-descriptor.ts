import { Validators } from '@angular/forms';
import { RequestButtedLooseLeafTestEntry } from '../../../api-services/lab-tests/butted-loose-leaf-test-api/models/request-butted-loose-leaf-test-entry';
import { FormControlValueDescriptor } from '../../../shared/models/form-control-value-descriptor';
export type ButtedLooseLeafForm = RequestButtedLooseLeafTestEntry & { entryTime: Date }

export const buttedLooseLeafFormControlDescriptor = new Map<keyof ButtedLooseLeafForm, FormControlValueDescriptor<unknown, unknown>>([
    ['operationOrderId', { value: null, validators: [Validators.required] }],
    ['shiftType', { value: null, validators: [Validators.required] }],
    ['entryDate', { value: null, validators: [Validators.required] }],
    ['entryTime', { value: null, validators: [Validators.required] }],
    ['sampleWeight', { value: null, validators: [Validators.required] }],
    ['freeLamina', { value: null, validators: [Validators.required] }],
    ['scrap', { value: null, validators: [Validators.required] }],
    ['looseButts', { value: null, validators: [Validators.required] }],
    ['unbuttedEnds', { value: null, validators: [Validators.required] }],
    ['nakedStems', { value: null, validators: [Validators.required] }],
    ['buttLengthLeft1', { value: null, validators: [Validators.required] }],
    ['buttLengthLeft2', { value: null, validators: [Validators.required] }],
    ['buttLengthLeft3', { value: null, validators: [Validators.required] }],
    ['buttLengthLeft4', { value: null, validators: [Validators.required] }],
    ['buttLengthLeft5', { value: null, validators: [Validators.required] }],
    ['buttLengthLeft6', { value: null, validators: [Validators.required] }],
    ['buttLengthLeft7', { value: null, validators: [Validators.required] }],
    ['buttLengthLeft8', { value: null, validators: [Validators.required] }],
    ['buttLengthLeft9', { value: null, validators: [Validators.required] }],
    ['buttLengthLeft10', { value: null, validators: [Validators.required] }],
    ['buttLengthRight1', { value: null, validators: [Validators.required] }],
    ['buttLengthRight2', { value: null, validators: [Validators.required] }],
    ['buttLengthRight3', { value: null, validators: [Validators.required] }],
    ['buttLengthRight4', { value: null, validators: [Validators.required] }],
    ['buttLengthRight5', { value: null, validators: [Validators.required] }],
    ['buttLengthRight6', { value: null, validators: [Validators.required] }],
    ['buttLengthRight7', { value: null, validators: [Validators.required] }],
    ['buttLengthRight8', { value: null, validators: [Validators.required] }],
    ['buttLengthRight9', { value: null, validators: [Validators.required] }],
    ['buttLengthRight10', { value: null, validators: [Validators.required] }]
]);
