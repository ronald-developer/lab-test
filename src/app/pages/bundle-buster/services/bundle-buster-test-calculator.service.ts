import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { nonTestProperties } from '../../../shared/models/non-test-properties';
import { BundleBusterForm } from '../models/bundle-buster-form-descriptor';
import { BundleBusterTestPercentageResult } from '../models/bundle-buster-test-result';
/**
 * @keyof_operator this acts as a safeguard for us to make sure
 * we're only accessing an existing properties in the object, this also gives us a nice intellisence
 */

/**
 * Key: only accepts the properties in the BundleBusterForm
 * @param key string literals - property of the BundleBusterForm
 * @param source object of BundleBusterForm
 * @returns source property value
 */
function getPropValue(key: keyof BundleBusterForm, source: any) {
	return +source[key];
}

type TestValue = {
	[key in keyof Omit<BundleBusterForm, typeof nonTestProperties[number]>]: number;
};

@Injectable()
export class BundleBusterTestCalculatorService {

	private calculationSource = new Subject<BundleBusterTestPercentageResult>();
	public calculations$ = this.calculationSource.asObservable();

	public calculate(formValues: BundleBusterForm) {
		// creates a copy of the form values
		const values: TestValue = { ...formValues };
		const sampleWeight = getPropValue('butted', values) + getPropValue('unButted', values);

		const pctButted = sampleWeight == 0 ? 0 : getPropValue('butted', values) / sampleWeight;
		const pctUnButted = sampleWeight == 0 ? 0 : getPropValue('unButted', values) / sampleWeight;

		const result: BundleBusterTestPercentageResult = {
			butted: +(pctButted.toFixed(4)),
			unButted: +(pctUnButted.toFixed(4))
		};

		this.calculationSource.next(result);
	}
}
