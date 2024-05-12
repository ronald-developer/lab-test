import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { nonTestProperties } from 'src/app/shared/models/non-test-properties';
import { LeavesForm } from '../models/leaves-form-descriptor';
import { LeavesPercentageResult } from '../models/leaves-test-result';

/**
 * @keyof_operator this acts as a safeguard for us to make sure
 * we're only accessing an existing properties in the object, this also gives us a nice intellisence
 */

/**
 * Key: only accepts the properties in the LeavesForm
 * @param key string literals - property of the LeavesForm
 * @param source object of LeavesForm
 * @returns source property value
 */
function getPropValue(key: keyof LeavesForm, source: any) {
	return +source[key];
}

type TestValue = {
	[key in keyof Omit<LeavesForm, typeof nonTestProperties[number]>]: number;
};

@Injectable()
export class LeavesTestCalculatorService {

	private calculationSource = new Subject<LeavesPercentageResult>();
	public calculations$ = this.calculationSource.asObservable();

	public calculate(formValues: LeavesForm) {
		const values: TestValue = { ...formValues };
		const sampleWeight = getPropValue('sampleWeight', values);
		const newTestWeight: number = getPropValue('laminaWeight', values) + getPropValue('stemWeight', values);
		const leavesPerKg: number = sampleWeight == 0 ? 0 : (getPropValue('noOfLeaves', values) / sampleWeight) * 1000;
		const pctLamina = newTestWeight == 0 ? 0 : getPropValue('laminaWeight', values) / newTestWeight;
		const pctStem = newTestWeight == 0 ? 0 : getPropValue('stemWeight', values) / newTestWeight;
		const result: LeavesPercentageResult = {
			pctLaminaWeight: +(pctLamina.toFixed(4)),
			pctStemWeight: +(pctStem.toFixed(4)),
			leavesPerKg: +(leavesPerKg.toFixed(4))
		};
		this.calculationSource.next(result);
	}
}
