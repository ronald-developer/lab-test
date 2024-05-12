import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StemAuditTestPercentageResult, StemAuditTestProps } from '../models/stem-audit-test-result';

/**
 * @keyof_operator this acts as a safeguard for us to make sure
 * we're only accessing an existing properties in the object, this also gives us a nice intellisence
 */

/**
 * Key: only accepts the properties in the StemAuditTestPercentageResult
 * @param key string literals - property of the StemAuditTestPercentageResult
 * @param source object of StemAuditTestPercentageResult
 * @returns source property value
 */
function getPropValue(key: keyof StemAuditTestProps, source: any) {
	return +source[key];
}

type TestValue = {
	[key in keyof StemAuditTestProps]: number;
};

@Injectable()
export class StemAuditTestCalculatorService {

	private calculationSource = new Subject<any>();
	public calculations$ = this.calculationSource.asObservable();

	public calculate(formValues: StemAuditTestProps) {
		const values: TestValue = { ...formValues };

		const sampleWeight = getPropValue('obj', values) +
			getPropValue('over7Mesh', values) +
			getPropValue('over12Mesh', values) +
			getPropValue('pan', values) +
			getPropValue('totalStem', values);

		const pctObj = sampleWeight == 0 ? 0 : getPropValue('obj', values) / sampleWeight;
		const pctOver7Mesh = sampleWeight == 0 ? 0 : getPropValue('over7Mesh', values) / sampleWeight;
		const pctOver12Mesh = sampleWeight == 0 ? 0 : getPropValue('over12Mesh', values) / sampleWeight;
		const pctTotalOverMesh = pctOver7Mesh + pctOver12Mesh;
		const pctPan = sampleWeight == 0 ? 0 : getPropValue('pan', values) / sampleWeight;
		const pctTotalStem = sampleWeight == 0 ? 0 : getPropValue('totalStem', values) / sampleWeight;

		const result: StemAuditTestPercentageResult = {
			obj: +(pctObj.toFixed(4)),
			over7Mesh: +(pctOver7Mesh.toFixed(4)),
			over12Mesh: +(pctOver12Mesh.toFixed(4)),
			totalOverMesh: +(pctTotalOverMesh.toFixed(4)),
			pan: +(pctPan.toFixed(4)),
			totalStem: +(pctTotalStem.toFixed(4)),
			sampleWeight: sampleWeight
		};
		this.calculationSource.next(result);
	}
}
