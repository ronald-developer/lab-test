import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { nonTestProperties } from '../../../shared/models/non-test-properties';
import { StemLengthTestPercentageResult } from '../models/stem-length-test-result';

/**
 * @keyof_operator this acts as a safeguard for us to make sure
 * we're only accessing an existing properties in the object, this also gives us a nice intellisence
 */

/**
 * Key: only accepts the properties in the StemLengthTestPercentageResult
 * @param key string literals - property of the StemLengthTestPercentageResult
 * @param source object of StemLengthTestPercentageResult
 * @returns source property value
 */
function getPropValue(key: keyof StemLengthTestPercentageResult, source: any) {
    return +source[key];
}

/**
 * Key: only accepts the properties in the StemLengthTestPercentageResult
 * @param key string literals - property of the StemLengthTestPercentageResult
 * @returns source property key
 */
function getPropKey(key: keyof StemLengthTestPercentageResult) {
    return key;
}

type TestValue = {
    [key in keyof StemLengthTestPercentageResult]: number;
};

const TestMultiplers = new Map<keyof StemLengthTestPercentageResult, number>([
    ['lessThanPoint5', 0.25],
    ['betweenPoint5And1', 0.75],
    ['between1And1Point5', 1.25],
    ['between1Point5And2', 1.75],
    ['between2And2Point5', 2.25],
    ['between2Point5And3', 2.7],
    ['between3And3Point5', 3.25],
    ['between3Point5And4', 3.75],
    ['moreThan4', 4.25]
]);

@Injectable()
export class StemLengthTestCalculatorService {
    private calculationSource = new Subject<StemLengthTestPercentageResult>();
    public calculations$ = this.calculationSource.asObservable();

    private averageLength = new Subject<number>();
    public averageLength$ = this.averageLength.asObservable();

    /**
     *
     * @param key property name in the StemLengthTestPercentageResult
     * @returns true for non test properties otherwise false
     */
    private isNonTestProps(key: string) {
        const excludeNonTestsProps = nonTestProperties
        const nonTestProp = excludeNonTestsProps.find(f => f == key);
        return !nonTestProp;
    }

    public calculate(formValues: StemLengthTestPercentageResult) {
        // creates a copy of the form values
        const values: TestValue = { ...formValues };

        // keys: are the property names in the StemLengthTestPercentageResult
        const keys = Object.keys(values) as Array<keyof StemLengthTestPercentageResult>;

        // add all test values
        const inputTotal = keys.reduce((total: number, key) => {
            if (this.isNonTestProps(key)) { // only add test properties
                total += getPropValue(key, values);
            }
            return total;
        }, 0);

        const excludeTestProps = [getPropKey('lessThanPoint5'), getPropKey('betweenPoint5And1'), getPropKey('moreThan4')];
        const percentageKeyVal: unknown = keys.reduce((acc: { [key: string]: number }, key) => {
            if (this.isNonTestProps(key)) {
                const testValue = getPropValue(key, values);

                // the calculated value for specific test property. (test/inputTotal)
                const calculatedValue = testValue !== 0 && inputTotal !== 0 ? +((testValue / inputTotal).toFixed(4)) : 0;

                // sets the value for specific test property.
                // note acc variable is an accumulator in which it is a key value pair as explicitly defined in the reduce method.
                // where key is a string and it is the property name of the test and value is a number.
                acc[key] = calculatedValue;

                // performs the calculation for between1To4 except for test properties defined above (excludeTestProps)
                if (!excludeTestProps.includes(key)) {
                    // calculates between1To4 by adding the calculated test value to between1To4
                    acc[getPropKey('between1To4')] = (acc[getPropKey('between1To4')] + acc[key] || 0 + acc[key]);
                }
            }
            return acc;
        }, {});

        const result = percentageKeyVal as StemLengthTestPercentageResult;

        // format to two decimal point and convert into a number
        result.between1To4 = +(result.between1To4.toFixed(4));

        // calculates average length for tests result
        const averageLength = keys.reduce((total: number, key) => {
            if (this.isNonTestProps(key) && getPropKey('between1To4') !== key) {
                const testMultiplier = TestMultiplers.get(key) as number;
                total += getPropValue(key, result) * testMultiplier;
            }
            return total;
        }, 0);

        this.averageLength.next(+averageLength);
        this.calculationSource.next(result);
    }
}


