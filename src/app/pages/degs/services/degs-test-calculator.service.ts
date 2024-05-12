import { Injectable } from '@angular/core';
import { DegsForm } from '../models/degs-form-descriptor';
import { nonTestProperties } from 'src/app/shared/models/non-test-properties';
import { DegsTestPercentageResult } from '../models/degs-test-result';
import { Subject } from 'rxjs';

/**
 * @keyof_operator this acts as a safeguard for us to make sure
 * we're only accessing an existing properties in the object, this also gives us a nice intellisence
 */

/**
 * Key: only accepts the properties in the FinesForm
 * @param key string literals - property of the DegsForm
 * @param source DegsForm value
 * @returns source property value
 */
function getPropValue(key: keyof DegsForm, source: any) {
	return +source[key];
}

type TestValue = {
	[key in keyof Omit<DegsForm, typeof nonTestProperties[number]>]: number;
};
@Injectable()
export class DegsTestCalculatorService {
	private calculationSource = new Subject<DegsTestPercentageResult>();
	public calculations$ = this.calculationSource.asObservable();

	public calculate(formValues: DegsForm) {
		// creates a copy of the form values
		const values: TestValue = { ...formValues };

		// calc the new sampleWeight value from the form values
		const sampleWeight = getPropValue('overOne', values) +
			getPropValue('overHalf', values) +
			getPropValue('overQuarter', values) +
			getPropValue('overEighth', values) +
			getPropValue('degsPan', values);

		const pctOverOne = sampleWeight == 0 ? 0 : getPropValue('overOne', values) / sampleWeight;
		const pctOverHalf = sampleWeight == 0 ? 0 : getPropValue('overHalf', values) / sampleWeight;
		const pctTotalOverHalf = pctOverOne + pctOverHalf;
		const pctOverQuarter = sampleWeight == 0 ? 0 : getPropValue('overQuarter', values) / sampleWeight;
		const pctTotalOverQuarter = pctOverQuarter + pctTotalOverHalf;
		const pctOverEighth = sampleWeight == 0 ? 0 : getPropValue('overEighth', values) / sampleWeight;
		const pctPan = sampleWeight == 0 ? 0 : getPropValue('degsPan', values) / sampleWeight;
		const pctThruQuarter = pctOverEighth + pctPan;

		const percentageKeyVal: DegsTestPercentageResult = {
			overOne: +(pctOverOne.toFixed(4)),
			overHalf: +(pctOverHalf.toFixed(4)),
			totalOverHalf: +(pctTotalOverHalf.toFixed(4)),
			overQuarter: +(pctOverQuarter.toFixed(4)),
			totalOverQuarter: +(pctTotalOverQuarter.toFixed(4)),
			overEighth: +(pctOverEighth.toFixed(4)),
			degsPan: +(pctPan.toFixed(4)),
			thruQuarter: +(pctThruQuarter.toFixed(4)),
			sampleWeight: sampleWeight
		}
		this.calculationSource.next(percentageKeyVal);
	}
}
