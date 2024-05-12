import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MathHelper } from '../../../utils/math-helper.utils';
import { DensityForm } from '../models/density-form-descriptor';
import { DensityTestPercentageResult, DensityTestProps } from '../models/density-test-result';

/**
 * @keyof_operator this acts as a safeguard for us to make sure
 * we're only accessing an existing properties in the object, this also gives us a nice intellisence
 */

/**
 * Key: only accepts the properties in the ShortStemTestPercentageResult
 * @param key string literals - property of the ShortStemTestPercentageResult
 * @param source object of ShortStemTestPercentageResult
 * @returns source property value
 */
function getPropValue(key: keyof DensityTestProps, source: any) {
  return +source[key];
}

type TestValue = {
  [key in keyof DensityTestProps]: number;
};

@Injectable()
export class DensityTestCalculatorService {

  private calculationSource = new Subject<any>();
  public calculations$ = this.calculationSource.asObservable();

  public calculate(formValues: DensityTestProps) {
    const values: TestValue = { ...formValues };
    const testValues = [getPropValue('l1', values),
    getPropValue('l2', values), getPropValue('l3', values),
    getPropValue('c1', values), getPropValue('c2', values),
    getPropValue('c3', values), getPropValue('r1', values),
    getPropValue('r2', values), getPropValue('r3', values)];

    const testAverage = MathHelper.average(testValues);
    const standardDeviation = MathHelper.standardDeviation(testValues);
    const cd = standardDeviation == 0 && testAverage == 0 ? 0 : (standardDeviation / testAverage) * 100;
    const result: DensityTestPercentageResult = { ...values, ave: +(testAverage.toFixed(2)), sd: +(standardDeviation.toFixed(2)), cd: +(cd.toFixed(2)) };
    this.calculationSource.next(result);
  }
}
