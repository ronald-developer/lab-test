import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { nonTestProperties } from '../../../shared/models/non-test-properties';
import { ShakerEfficiencyForm } from '../models/shaker-efficiency-form-descriptor';
import { ShakerEfficiencyTestPercentageResult } from '../models/shaker-efficiency-test-result';
/**
 * @keyof_operator this acts as a safeguard for us to make sure
 * we're only accessing an existing properties in the object, this also gives us a nice intellisence
 */

/**
 * Key: only accepts the properties in the ShakerEfficiencyForm
 * @param key string literals - property of the ShakerEfficiencyForm
 * @param source object of ShakerEfficiencyForm
 * @returns source property value
 */
function getPropValue(key: keyof ShakerEfficiencyForm, source: any) {
  return +source[key];
}

type TestValue = {
  [key in keyof Omit<ShakerEfficiencyForm, typeof nonTestProperties[number]>]: number;
};

@Injectable()
export class ShakerEfficiencyTestCalculatorService {

  private calculationSource = new Subject<ShakerEfficiencyTestPercentageResult>();
  public calculations$ = this.calculationSource.asObservable();

  public calculate(formValues: ShakerEfficiencyForm) {
    // creates a copy of the form values
    const values: TestValue = { ...formValues };
    const sampleWeight = getPropValue('overOne', values) + getPropValue('betweenHalfAndOne', values)+ getPropValue('betweenQuarterAndHalf', values)+ getPropValue('betweenEighthAndQuarter', values)+ getPropValue('lessThanEighth', values);
    const pctoverOne = sampleWeight == 0 ? 0 : getPropValue('overOne', values) / sampleWeight;
    const pctBetweenHalfAndOne = sampleWeight == 0 ? 0 : getPropValue('betweenHalfAndOne', values) / sampleWeight;
	const pctBetweenQuarterAndHalf = sampleWeight == 0 ? 0 : getPropValue('betweenQuarterAndHalf', values) / sampleWeight;
	const pctBetweenEighthAndQuarter = sampleWeight == 0 ? 0 : getPropValue('betweenEighthAndQuarter', values) / sampleWeight;
	const pctLessThanEighth = sampleWeight == 0 ? 0 : getPropValue('lessThanEighth', values) / sampleWeight;
    const result : ShakerEfficiencyTestPercentageResult = {
		overOne: +(pctoverOne.toFixed(4)),
		betweenHalfAndOne: +(pctBetweenHalfAndOne.toFixed(4)),
		betweenQuarterAndHalf: +(pctBetweenQuarterAndHalf.toFixed(4)),
		betweenEighthAndQuarter: +(pctBetweenEighthAndQuarter.toFixed(4)),
		lessThanEighth: +(pctLessThanEighth.toFixed(4)),
    };
    this.calculationSource.next(result);
  }
}
