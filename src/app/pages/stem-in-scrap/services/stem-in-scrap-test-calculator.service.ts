import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { nonTestProperties } from '../../../shared/models/non-test-properties';
import { StemInScrapForm } from '../models/stem-in-scrap-form-descriptor';
import { StemInScrapPercentageResult } from '../models/stem-in-scrap-percentage-result';
/**
 * @keyof_operator this acts as a safeguard for us to make sure
 * we're only accessing an existing properties in the object, this also gives us a nice intellisence
 */

/**
 * Key: only accepts the properties in the StemInScrapForm
 * @param key string literals - property of the StemInScrapForm
 * @param source object of StemInScrapForm
 * @returns source property value
 */
function getPropValue(key: keyof StemInScrapForm, source: any) {
  return +source[key];
}


type TestValue = {
  [key in keyof Omit<StemInScrapForm, typeof nonTestProperties[number]>]: number;
};

@Injectable()
export class StemInScrapTestCalculatorService {
  private calculationSource = new Subject<StemInScrapPercentageResult>();
  public calculations$ = this.calculationSource.asObservable();
  calculate(formValues: StemInScrapForm) {
    const values: TestValue = { ...formValues };
    const sampleWeight = getPropValue('sampleWeight', values);
    const stemInScrap = getPropValue('stemInScrap', values);
    const pctStemInScrap = sampleWeight == 0 ? 0 : stemInScrap / sampleWeight;
    const result: StemInScrapPercentageResult = { pctStemInScrap: +pctStemInScrap.toFixed(4) };
    this.calculationSource.next(result);
  }

}
