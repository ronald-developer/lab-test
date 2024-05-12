import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { nonTestProperties } from 'src/app/shared/models/non-test-properties';
import { ButtedLooseLeafForm } from '../models/butted-loose-leaf-form-descriptor';
import { ButtedLooseLeafPercentageResult } from '../models/butted-loose-leaf-test-result';

/**
 * @keyof_operator this acts as a safeguard for us to make sure
 * we're only accessing an existing properties in the object, this also gives us a nice intellisence
 */

/**
 * Key: only accepts the properties in the ButtedLooseLeafForm
 * @param key string literals - property of the ButtedLooseLeafForm
 * @param source object of ButtedLooseLeafForm
 * @returns source property value
 */
function getPropValue(key: keyof ButtedLooseLeafForm, source: any) {
    return +source[key];
}

type TestValue = {
    [key in keyof Omit<ButtedLooseLeafForm, typeof nonTestProperties[number]>]: number;
};

@Injectable()
export class ButtedLooseLeafTestCalculatorService {

    private calculationSource = new Subject<ButtedLooseLeafPercentageResult>();
    public calculations$ = this.calculationSource.asObservable();

    public calculate(formValues: ButtedLooseLeafForm) {
        const values: TestValue = { ...formValues };

        const sampleWeight = getPropValue('sampleWeight', values);
        const pctFreeLamina = sampleWeight == 0 ? 0 : getPropValue('freeLamina', values) / sampleWeight;
        const pctScrap = sampleWeight == 0 ? 0 : getPropValue('scrap', values) / sampleWeight;
        const pctLooseButts = sampleWeight == 0 ? 0 : getPropValue('looseButts', values) / sampleWeight;
        const pctUnbuttedEnds = sampleWeight == 0 ? 0 : getPropValue('unbuttedEnds', values) / sampleWeight;
        const pctNakedStems = sampleWeight == 0 ? 0 : getPropValue('nakedStems', values) / sampleWeight;
        const buttedLeaf = 1 - (pctFreeLamina - pctScrap - pctLooseButts - pctUnbuttedEnds - pctNakedStems);

        const buttedLooseLeafLeftPropertyNames = Array.from(Array(10).keys()).map((x => `buttLengthLeft${x + 1}`));

        // sum up the buttend loose leaf left
        const totalLeft = buttedLooseLeafLeftPropertyNames.reduce((acc: number, key: any) => {
            acc = acc + getPropValue(key, values);
            return acc;
        }, 0)
        const buttedLooseLeafLeftAve = +((totalLeft / buttedLooseLeafLeftPropertyNames.length).toFixed(4))

        const buttedLooseLeafRightPropertyNames = Array.from(Array(10).keys()).map((x => `buttLengthRight${x + 1}`));

        // sum up the buttend loose leaf right
        const totalRight = buttedLooseLeafRightPropertyNames.reduce((acc: number, key: any) => {
            acc = acc + getPropValue(key, values);
            return acc;
        }, 0);
        const buttedLooseLeafRightAve = +((totalRight / buttedLooseLeafRightPropertyNames.length).toFixed(4));

        const result: ButtedLooseLeafPercentageResult = {
            freeLamina: pctFreeLamina,
            scrap: pctScrap,
            looseButts: pctLooseButts,
            unbuttedEnds: pctUnbuttedEnds,
            nakedStems: pctNakedStems,
            buttedLeaf: buttedLeaf,
            buttLengthLeft: buttedLooseLeafLeftAve,
            buttLengthRight: buttedLooseLeafRightAve
        };
        this.calculationSource.next(result);
    }
}
