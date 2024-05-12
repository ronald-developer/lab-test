

import { RequestNtrmInLineTestEntryModel } from 'src/app/api-services/lab-tests/ntrm-in-line-test-api/models/request-ntrm-in-line-test-entry-model';
import { FormControlValueDescriptor } from '../../../shared/models/form-control-value-descriptor';
import { Validators } from '@angular/forms';
/**
 * Ntrm in line test form definition
 */
export type NtrmInLineDetailsForm = RequestNtrmInLineTestEntryModel & { entryTime: Date }

export const ntrmInLineDetailsFormControlDescriptor = new Map<keyof NtrmInLineDetailsForm, FormControlValueDescriptor<unknown, unknown>>([
	['id', { value: null, validators: [] }],
	['operationOrderId', { value: null, validators: [Validators.required] }],
	['motherGradeId', { value: null, validators: [Validators.required] }],
	['packingGradeId', { value: null, validators: [Validators.required] }],
	['productTypeId', { value: null, validators: [Validators.required] }],
	['ntrmLocationId', { value: null, validators: [Validators.required] }],
	['shiftType', { value: null, validators: [Validators.required] }],
	['entryDate', { value: null, validators: [Validators.required] }],
	['entryTime', { value: null, validators: [Validators.required] }],
	['testUnitOfMeasure', { value: null, validators: [Validators.required] }],
	['weed', { value: 0, validators: [Validators.required] }],
	['wood', { value: 0, validators: [Validators.required] }],
	['fibres', { value: 0, validators: [Validators.required] }],
	['paper', { value: 0, validators: [Validators.required] }],
	['feathers', { value: 0, validators: [Validators.required] }],
	['insects', { value: 0, validators: [Validators.required] }],
	['otherOrganic', { value: 0, validators: [Validators.required] }],
	['otherOrganicType', { value: 'NA', validators: [Validators.required] }],
	['rocks', { value: 0, validators: [Validators.required] }],
	['metals', { value: 0, validators: [Validators.required] }],
	['otherInorganicNonSynthetic', { value: 0, validators: [Validators.required] }],
	['otherInorganicNonSyntheticType', { value: 'NA', validators: [Validators.required] }],
	['nylon', { value: 0, validators: [Validators.required] }],
	['rubber', { value: 0, validators: [Validators.required] }],
	['foam', { value: 0, validators: [Validators.required] }],
	['plastic', { value: 0, validators: [Validators.required] }],
	['otherInorganicSynthetic', { value: 0, validators: [Validators.required] }],
	['otherInorganicSyntheticType', { value: 'NA', validators: [Validators.required] }]
]);
