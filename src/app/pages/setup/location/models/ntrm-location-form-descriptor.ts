import { Validators } from '@angular/forms';
import { RequestNtrmLocationEntry } from 'src/app/api-services/setup/ntrm-location-api/models/request-ntrm-location-entry';
import { FormControlValueDescriptor } from 'src/app/shared/models/form-control-value-descriptor';
export type NtrmLocationForm = RequestNtrmLocationEntry

export const ntrmLocationFormControlDescriptor = new Map<keyof NtrmLocationForm, FormControlValueDescriptor<unknown, unknown>>([
    ['name', { value: null, validators: [Validators.required] }],
    ['isActive', { value: true, validators: [Validators.required] }],
]);
