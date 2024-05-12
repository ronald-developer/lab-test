import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { nonTestProperties } from '../../../shared/models/non-test-properties';
import { SandPercentageResult } from '../models/sand-percentage-result';
import { SandForm } from '../models/sand-form-descriptor';
/**
 * @keyof_operator this acts as a safeguard for us to make sure
 * we're only accessing an existing properties in the object, this also gives us a nice intellisence
 */

/**
 * Key: only accepts the properties in the SandForm
 * @param key string literals - property of the SandForm
 * @param source object of SandForm
 * @returns source property value
 */
function getPropValue(key: keyof SandForm, source: any) {
	return +source[key];
}


type TestValue = {
	[key in keyof Omit<SandForm, typeof nonTestProperties[number]>]: number;
};

@Injectable()
export class SandTestCalculatorService {
	private calculationSource = new Subject<SandPercentageResult>();
	public calculations$ = this.calculationSource.asObservable();
	calculate(formValues: SandForm) {
		const values: TestValue = { ...formValues };
		const sampleWeight = getPropValue('sampleWeight', values);
		const pctSand = sampleWeight == 0 ? 0 : getPropValue('pan', values) / sampleWeight;
		const pctTwelveMesh = sampleWeight == 0 ? 0 :  getPropValue('twelveMesh', values) / sampleWeight;
		const pctTwentyMesh = sampleWeight == 0 ? 0 :  getPropValue('twentyMesh', values) / sampleWeight;
		const pctFourtyMesh = sampleWeight == 0 ? 0 :  getPropValue('fourtyMesh', values) / sampleWeight;
		const result: SandPercentageResult = {
			sand: +pctSand.toFixed(4),
			twelveMesh: +pctTwelveMesh.toFixed(4),
			twentyMesh: +pctTwentyMesh.toFixed(4),
			fourtyMesh: +pctFourtyMesh.toFixed(4)
		 };
		this.calculationSource.next(result);
	}

}
