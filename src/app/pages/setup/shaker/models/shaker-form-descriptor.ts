import { Validators } from '@angular/forms';
import { RequestShakerEntry } from 'src/app/api-services/setup/shaker-api/models/request-shaker-entry';
import { FormControlValueDescriptor } from 'src/app/shared/models/form-control-value-descriptor';
export type ShakerForm = RequestShakerEntry

export const ShakerFormControlDescriptor = new Map<keyof ShakerForm, FormControlValueDescriptor<unknown, unknown>>([
    ['name', { value: null, validators: [Validators.required] }],
    ['isActive', { value: true, validators: [Validators.required] }],
]);
