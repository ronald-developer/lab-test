import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { nonTestProperties } from 'src/app/shared/models/non-test-properties';
import { LooseLeafForm } from '../models/loose-leaf-form-descriptor';
import { LooseLeafPercentageResult } from '../models/loose-leaf-test-result';

/**
 * @keyof_operator this acts as a safeguard for us to make sure
 * we're only accessing an existing properties in the object, this also gives us a nice intellisence
 */

/**
 * Key: only accepts the properties in the LooseLeafForm
 * @param key string literals - property of the LooseLeafForm
 * @param source object of LooseLeafForm
 * @returns source property value
 */
function getPropValue(key: keyof LooseLeafForm, source: any) {
    return +source[key];
}

type TestValue = {
    [key in keyof Omit<LooseLeafForm, typeof nonTestProperties[number]>]: number;
};

@Injectable()
export class LooseLeafTestCalculatorService {
    private calculationSource = new Subject<LooseLeafPercentageResult>();
    public calculations$ = this.calculationSource.asObservable();

    public calculate(formValues: LooseLeafForm) {
        const values: TestValue = { ...formValues };
        const newTestWeight: number = getPropValue('overOneInch', values) +
            getPropValue('overHalfInch', values) +
            getPropValue('overOneFourthInch', values) +
            getPropValue('overOneEigthInch', values) +
            getPropValue('pan', values);
        const overOneInch: number = newTestWeight == 0 ? 0 : getPropValue('overOneInch', values) / newTestWeight;
        const overHalfInch: number = newTestWeight == 0 ? 0 : getPropValue('overHalfInch', values) / newTestWeight;
        const overOneFourthInch: number = newTestWeight == 0 ? 0 : getPropValue('overOneFourthInch', values) / newTestWeight;
        const overOneEigthInch: number = newTestWeight == 0 ? 0 : getPropValue('overOneEigthInch', values) / newTestWeight;
        const overHalfInchAddoverOneFourthInch = overHalfInch + overOneFourthInch;
        const pan = newTestWeight == 0 ? 0 : getPropValue('pan', values) / newTestWeight;
        const result: LooseLeafPercentageResult = {
            overOneInch: +(overOneInch.toFixed(4)),
            overHalfInch: +(overHalfInch.toFixed(4)),
            overOneFourthInch: +(overOneFourthInch.toFixed(4)),
            overOneEigthInch: +(overOneEigthInch.toFixed(4)),
            overOneHalfPlusOneFourth: +(overHalfInchAddoverOneFourthInch.toFixed(4)),
            pan: +(pan.toFixed(4))
        };
        this.calculationSource.next(result);
    }
}
