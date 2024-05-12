import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { nonTestProperties } from '../../../shared/models/non-test-properties';
import { ShortStemTestPercentageResult } from '../models/short-stem-test-result';
import { ShortStemForm } from '../models/short-stem-form-descriptor';

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
function getPropValue(key: keyof ShortStemTestPercentageResult, source: any) {
    return +source[key];
}

/**
 * Key: only accepts the properties in the ShortStemTestPercentageResult
 * @param key string literals - property of the ShortStemTestPercentageResult
 * @returns source property key
 */
function getPropKey(key: keyof ShortStemTestPercentageResult) {
    return key;
}

type TestValue = {
    [key in keyof Omit<ShortStemForm, typeof nonTestProperties[number]>]: number;
};

@Injectable()
export class ShortStemTestCalculatorService {
    private calculationSource = new Subject<ShortStemTestPercentageResult>();
    public calculations$ = this.calculationSource.asObservable();

    public calculate(formValues: ShortStemForm) {

        // creates a copy of the form values
        const values: TestValue = { ...formValues };

        // keys: are the property names in the ShortStemTestPercentageResult
        const keys = Object.keys(values) as Array<keyof ShortStemTestPercentageResult>;

        // gets the sample weight from the values(TestValues).
        // getPropValues 1st argument only accepts string literal values from ShortStemTestPercentageResult(type safe)
        // and if we hover over the getPropValue it will show the accepted union of string values
        const sampleWeight = getPropValue('sampleWeight', values);

        const excludeNonTestsProps = nonTestProperties;

        // iterates thru key property names to perform the calculation and set the key values
        const percentageKeyVal: unknown = keys.reduce((acc: { [key: string]: number }, key) => {
            const nonTestProp = excludeNonTestsProps.find(f => f == key as string);
            // perform calculation on test properties only. try hover over the key variable to see the union of string values(test property names)
            if (!nonTestProp && getPropKey('sampleWeight') !== key) {

                // gets the test value from values(TestValue from form's value)
                const testValue = getPropValue(key, values);

                // the calculated value for specific test property.
                const calculatedValue = testValue !== 0 && sampleWeight !== 0 ? +((testValue / sampleWeight).toFixed(4)) : 0;

                // sets the value for specific test property.
                // note acc variable is an accumulator in which it is a key value pair as explicitly defined in the reduce method.
                // where key is a string and it is the property name of the test and value is a number.
                acc[key] = calculatedValue;

                if (getPropKey('pan') !== key && getPropKey('sampleWeight') !== key) {
                    // calculates the totalStem value by adding the calculated test value(except pan and sampleWeight) to the totalStem
                    acc[getPropKey('totalStem')] = (acc[getPropKey('totalStem')] + acc[key] || 0 + acc[key]);
                }
            }
            return acc;
        }, {});

        const result = percentageKeyVal as ShortStemTestPercentageResult;

        // format to two decimal point and convert into a number
        result.totalStem = +(result.totalStem.toFixed(4));

        this.calculationSource.next(result);
    }
}

