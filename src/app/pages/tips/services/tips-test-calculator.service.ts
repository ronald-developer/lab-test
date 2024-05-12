import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { nonTestProperties } from '../../../shared/models/non-test-properties';
import { TipsForm } from '../models/tips-form-descriptor';
import { TipsTestPercentageResult } from '../models/tips-test-result';
/**
 * @keyof_operator this acts as a safeguard for us to make sure
 * we're only accessing an existing properties in the object, this also gives us a nice intellisence
 */

/**
 * Key: only accepts the properties in the TipsForm
 * @param key string literals - property of the TipsForm
 * @param source object of TipsForm
 * @returns source property value
 */
function getPropValue(key: keyof TipsForm, source: any) {
  return +source[key];
}

type TestValue = {
  [key in keyof Omit<TipsForm, typeof nonTestProperties[number]>]: number;
};

@Injectable()
export class TipsTestCalculatorService {

  private calculationSource = new Subject<TipsTestPercentageResult>();
  public calculations$ = this.calculationSource.asObservable();

  public calculate(formValues: TipsForm) {
    // creates a copy of the form values
    const values: TestValue = { ...formValues };
    const sampleWeight = getPropValue('sampleWeight', values);
    const totalTestValue: number = getPropValue('obj', values) + getPropValue('mesh7', values) + getPropValue('mesh12', values) + getPropValue('pan', values);
    const pctObjInTips = sampleWeight == 0 ? 0 : getPropValue('obj', values) / sampleWeight;
    const pctStemInTips = sampleWeight == 0 ? 0 : totalTestValue / sampleWeight;
    const result : TipsTestPercentageResult = {
      pctObjInTips: +(pctObjInTips.toFixed(4)),
      pctStemInTips: +(pctStemInTips.toFixed(4))
    };
    this.calculationSource.next(result);
  }
}
