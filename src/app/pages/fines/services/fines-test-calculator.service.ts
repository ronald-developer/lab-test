
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { nonTestProperties } from 'src/app/shared/models/non-test-properties';
import { FinesForm } from '../models/fines-form-descriptor';
import { FinesPercentageResult } from '../models/fines-test-result';

/**
 * @keyof_operator this acts as a safeguard for us to make sure
 * we're only accessing an existing properties in the object, this also gives us a nice intellisence
 */

/**
 * Key: only accepts the properties in the FinesForm
 * @param key string literals - property of the FinesForm
 * @param source object of FinesForm
 * @returns source property value
 */
function getPropValue(key: keyof FinesForm, source: any) {
	return +source[key];
}

type TestValue = {
	[key in keyof Omit<FinesForm, typeof nonTestProperties[number]>]: number;
};

@Injectable()
export class FinesTestCalculatorService {

	private calculationSource = new Subject<FinesPercentageResult>();
	public calculations$ = this.calculationSource.asObservable();

	public calculate(formValues: FinesForm) {
		// creates a copy of the form values
		const values: TestValue = { ...formValues };

		// gets the sampleWeight value from the form values
		const sampleWeight = getPropValue('over4', values) + getPropValue('over8', values) + getPropValue('over16', values) + getPropValue('over32', values) + getPropValue('pan', values);
		// calculates pctOver4
		const pctOver4 = sampleWeight == 0 ? 0 : getPropValue('over4', values) / sampleWeight;
		// calculates pctOver8
		const pctOver8 = sampleWeight == 0 ? 0 : getPropValue('over8', values) / sampleWeight;
		// calculates pctOver16
		const pctOver16 = sampleWeight == 0 ? 0 : getPropValue('over16', values) / sampleWeight;
		// calculates pctOver32
		const pctOver32 = sampleWeight == 0 ? 0 : getPropValue('over32', values) / sampleWeight;
		// calculates pctOver64
		const pctPan = sampleWeight == 0 ? 0 : getPropValue('pan', values) / sampleWeight;

		const percentageKeyVal: FinesPercentageResult = {
			over4: +(pctOver4.toFixed(4)),
			over8: +(pctOver8.toFixed(4)),
			over16: +(pctOver16.toFixed(4)),
			over32: +(pctOver32.toFixed(4)),
			pan: +(pctPan.toFixed(4)),
		}

		this.calculationSource.next(percentageKeyVal);
	}
}
