import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { nonTestProperties } from 'src/app/shared/models/non-test-properties';
import { StemDiameterForm } from '../models/stem-diameter-form-descriptor';
import { StemDiameterTestPercentageResult } from '../models/stem-diameter-test-result';
/**
 * @keyof_operator this acts as a safeguard for us to make sure
 * we're only accessing an existing properties in the object, this also gives us a nice intellisence
 */

/**
 * Key: only accepts the properties in the StemDiameterForm
 * @param key string literals - property of the StemDiameterForm
 * @param source object of StemDiameterTestPercentageResult
 * @returns source property value
 */
function getPropValue(key: keyof StemDiameterForm, source: any) {
    return +source[key];
}

type TestValue = {
    [key in keyof Omit<StemDiameterForm, typeof nonTestProperties[number]>]: number;
};

@Injectable({
    providedIn: 'root'
})
export class StemDiameterTestCalculatorService {
    private calculationSource = new Subject<StemDiameterTestPercentageResult>();
    public calculations$ = this.calculationSource.asObservable();

    public calculate(formValues: StemDiameterForm) {
        const values: TestValue = { ...formValues };
        const obj = getPropValue('obj', values);
        const usNo35 = getPropValue('usNo35', values);
        const pan = getPropValue('pan', values);
        const sampleWeight = obj + usNo35 + pan;
        let result: StemDiameterTestPercentageResult;
        if (sampleWeight == 0) {
            result = {
                obj: 0,
                usNo35: 0,
                pan: 0
            }
        } else {
            result = {
                obj: +(obj / sampleWeight).toFixed(4),
                usNo35: +(usNo35 / sampleWeight).toFixed(4),
                pan: +(pan / sampleWeight).toFixed(4)
            }
        }
        this.calculationSource.next(result);
    }
}
