import { Validators } from '@angular/forms';
import { RequestBundleBusterTestEntry } from 'src/app/api-services/lab-tests/bundle-buster-test-api/models/request-bundle-buster-test-entry';
import { FormControlValueDescriptor } from '../../../shared/models/form-control-value-descriptor';
export type BundleBusterForm = RequestBundleBusterTestEntry & { entryTime: Date }

export const bundleBusterFormControlDescriptor = new Map<keyof BundleBusterForm, FormControlValueDescriptor<unknown, unknown>>([
    ['operationOrderId', { value: null, validators: [Validators.required] }],
    ['positionType', { value: null, validators: [Validators.required] }],
    ['entryDate', { value: null, validators: [Validators.required] }],
    ['entryTime', { value: null, validators: [Validators.required] }],
    ['butted', { value: null, validators: [Validators.required] }],
    ['unButted', { value: null, validators: [Validators.required] }]
]);
