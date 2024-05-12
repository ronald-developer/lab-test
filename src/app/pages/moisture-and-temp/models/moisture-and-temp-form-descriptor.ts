
import { FormControlValueDescriptor } from '../../../shared/models/form-control-value-descriptor';
import { Validators } from '@angular/forms';
import { RequestMoistureAndTempTestEntryModel } from 'src/app/api-services/lab-tests/moisture-and-temp-test-api/models/request-moisture-and-temp-test-entry-model';

export type MoistureAndTempTestForm = RequestMoistureAndTempTestEntryModel & { entryTime: Date }

export const moistureAndTempTestFormControlDescriptor = new Map<keyof MoistureAndTempTestForm, FormControlValueDescriptor<unknown, unknown>>([
	['id', { value: null, validators: [] }],
	['operationOrderId', { value: null, validators: [Validators.required] }],
	['shiftType', { value: null, validators: [Validators.required] }],
	['entryDate', { value: null, validators: [Validators.required] }],
	['entryTime', { value: null, validators: [Validators.required] }],
	['packingGradeId', { value: null, validators: [Validators.required] }],
	['cartonNo', { value: null, validators: [Validators.required] }],
	['mettlerResult', { value: null, validators: [Validators.required] }],
	['hearsonPct', { value: 0, validators: [Validators.required] }],
	['temperature', { value: 0, validators: [Validators.required] }]
]);
