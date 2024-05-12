import { Injectable } from '@angular/core';
import { nonTestProperties } from 'src/app/shared/models/non-test-properties';
import { NtrmGreenForm } from '../models/ntrm-green-form-descriptor';
import { NtrmGreenTestResult } from '../models/ntrm-green-test-result';
import { Subject } from 'rxjs';

/**
 * @keyof_operator this acts as a safeguard for us to make sure
 * we're only accessing an existing properties in the object, this also gives us a nice intellisence
 */

/**
 * Key: only accepts the properties in the NtrmGreen
 * @param key string literals - property of the NtrmGreen
 * @param source object of NtrmGreen
 * @returns source property value
 */
function getPropValue(key: keyof NtrmGreenForm, source: any) {
	return +source[key];
}

type TestValue = {
	[key in keyof Omit<NtrmGreenForm, typeof nonTestProperties[number]>]: number;
};

@Injectable({
	providedIn: 'root'
})
export class NtrmGreenTestCalculatorService {
	private calculationSource = new Subject<NtrmGreenTestResult>();
	public calculations$ = this.calculationSource.asObservable();

	calculate(formValues: NtrmGreenForm) {
		const values: TestValue = { ...formValues };
		const baleWeight = getPropValue('baleWeight', values)

		const category1MineralPcs: number = getPropValue('category1Mineral', values);
		const category1SyntheticPcs: number = getPropValue('category1Synthetic', values);
		const category2NaturalPcs: number = getPropValue('category2Natural', values);
		const category2NonSyntheticPcs: number = getPropValue('category2NonSynthetic', values);
		const category2OrganicPcs: number = getPropValue('category2Organic', values);

		const category1MineralPcsKg: number = baleWeight == 0 ? 0 : getPropValue('category1Mineral', values) / baleWeight;
		const category1SyntheticPcsKg: number = baleWeight == 0 ? 0 : getPropValue('category1Synthetic', values) / baleWeight;
		const category2NaturalPcsKg: number = baleWeight == 0 ? 0 : getPropValue('category2Natural', values) / baleWeight;
		const category2NonSyntheticPcsKg: number = baleWeight == 0 ? 0 : getPropValue('category2NonSynthetic', values) / baleWeight;
		const category2OrganicPcsKg: number = baleWeight == 0 ? 0 : getPropValue('category2Organic', values) / baleWeight;

		const result: NtrmGreenTestResult = {
			category1Mineral: +(category1MineralPcs.toFixed(4)),
			category1Synthetic: +(category1SyntheticPcs.toFixed(4)),
			category2Natural: +(category2NaturalPcs.toFixed(4)),
			category2NonSynthetic: +(category2NonSyntheticPcs.toFixed(4)),
			category2Organic: +(category2OrganicPcs.toFixed(4)),

			category1MineralPcsKg: +(category1MineralPcsKg.toFixed(4)),
			category1SyntheticPcsKg: +(category1SyntheticPcsKg.toFixed(4)),
			category2NaturalPcsKg: +(category2NaturalPcsKg.toFixed(4)),
			category2NonSyntheticPcsKg: +(category2NonSyntheticPcsKg.toFixed(4)),
			category2OrganicPcsKg: +(category2OrganicPcsKg.toFixed(4)),
			baleWeight: +baleWeight
		}

		this.calculationSource.next(result);
	}

}
