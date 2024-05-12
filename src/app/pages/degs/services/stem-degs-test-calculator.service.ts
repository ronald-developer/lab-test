import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { nonTestProperties } from 'src/app/shared/models/non-test-properties';
import { StemDegsForm } from '../models/stem-degs-form-descriptor';
import { StemDegsTestPercentageResult } from '../models/stem-degs-test-result';

/**
 * @keyof_operator this acts as a safeguard for us to make sure
 * we're only accessing an existing properties in the object, this also gives us a nice intellisence
 */

/**
 * Key: only accepts the properties in the FinesForm
 * @param key string literals - property of the DegsForm
 * @param source StemDegsForm value
 * @returns source property value
 */
function getPropValue(key: keyof StemDegsForm, source: any) {
	return +source[key];
}

type TestValue = {
	[key in keyof Omit<StemDegsForm, typeof nonTestProperties[number]>]: number;
};
@Injectable()
export class StemDegsTestCalculatorService {
	private calculationSource = new Subject<StemDegsTestPercentageResult>();
	public calculations$ = this.calculationSource.asObservable();

	public calculate(formValues: StemDegsForm) {
		// creates a copy of the form values
		const values: TestValue = { ...formValues };

		// calc the new sampleWeight value from the form values
		const sampleWeight = getPropValue('stemSampleWeight', values);

		const pctObj = sampleWeight == 0 ? 0 : getPropValue('stemObj', values) / sampleWeight;
		const pctStemSevenMesh = sampleWeight == 0 ? 0 : getPropValue('stemSevenMesh', values) / sampleWeight;
		const pctStemTwelveMesh = sampleWeight == 0 ? 0 : getPropValue('stemTwelveMesh', values) / sampleWeight;
		const pctStemSevenTwelveMesh = pctStemSevenMesh + pctStemTwelveMesh;
		const pctStemPan = sampleWeight == 0 ? 0 : getPropValue('stemPan', values) / sampleWeight;
		const pctTotalStem = pctObj + pctStemSevenTwelveMesh;
		const pctHandstripTotal = pctObj + pctStemSevenMesh;

		const percentageKeyVal: StemDegsTestPercentageResult = {
			stemObj: +(pctObj.toFixed(4)),
			stemSevenMesh: +(pctStemSevenMesh.toFixed(4)),
			stemTwelveMesh: +(pctStemTwelveMesh.toFixed(4)),
			stemSevenTwelveMesh: +(pctStemSevenTwelveMesh.toFixed(4)),
			stemPan: +(pctStemPan.toFixed(4)),
			totalStem: +(pctTotalStem.toFixed(4)),
			handstripTotal: +(pctHandstripTotal.toFixed(4))
		}
		this.calculationSource.next(percentageKeyVal);
	}
}
