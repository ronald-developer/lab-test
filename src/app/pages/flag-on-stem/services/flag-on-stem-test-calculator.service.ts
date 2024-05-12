import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { nonTestProperties } from 'src/app/shared/models/non-test-properties';
import { FlagOnStemForm } from '../models/flag-on-stem-form-descriptor';
import { FlagOnStemPercentageResult } from '../models/flag-on-stem-test-result';

/**
 * @keyof_operator this acts as a safeguard for us to make sure
 * we're only accessing an existing properties in the object, this also gives us a nice intellisence
 */

/**
 * Key: only accepts the properties in the FlagOnStemForm
 * @param key string literals - property of the FlagOnStemForm
 * @param source object of FlagOnStemForm
 * @returns source property value
 */
function getPropValue(key: keyof FlagOnStemForm, source: any) {
    return +source[key];
}

type TestValue = {
    [key in keyof Omit<FlagOnStemForm, typeof nonTestProperties[number]>]: number;
};

@Injectable()
export class FlagOnStemTestCalculatorService {

    private calculationSource = new Subject<FlagOnStemPercentageResult>();
    public calculations$ = this.calculationSource.asObservable();

    public calculate(formValues: FlagOnStemForm) {
      // creates a copy of the form values
        const values: TestValue = { ...formValues };

        // gets the sampleWeight value from the form values
        const sampleWeight = getPropValue('sampleWeight', values);
        // calculates pctLamina
        const pctLamina = sampleWeight == 0 ? 0 : getPropValue('attachedLamina', values) / sampleWeight;
        // calculates pctFreeLamina
        const pctFreeLamina = sampleWeight == 0 ? 0 : getPropValue('freeLamina', values) / sampleWeight;
        // calculates pctTotalFlag
        const pctTotalFlag = pctLamina + pctFreeLamina;
        const percentageKeyVal: FlagOnStemPercentageResult = {
            attachedLamina: +(pctLamina.toFixed(4)),
            freeLamina: +(pctFreeLamina.toFixed(4)),
            totalFlag: +(pctTotalFlag.toFixed(4))
        }

        this.calculationSource.next(percentageKeyVal);
    }
}
