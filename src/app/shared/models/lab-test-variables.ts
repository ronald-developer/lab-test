import { ShiftType } from "./shift-type";

export type TestCommonVariables = {
	operationOrderId: number;
	shiftType: ShiftType;
	entryDate: Date;
	packingGradeId: number;
	screenType: unknown;
	productId: number;
	productTypeId: number;
	testUnitOfMeasure: number;
}

/**
 *
 * @param key - Test property name in the source
 * @param source - form value data
 * @returns the value of the test property key
 */
function getPropValue(key: keyof TestCommonVariables, source: any) {
	return source[key];
}


export class LabTestVariables {

	constructor(testInputs: any) {
		this.parameters = {
			operationOrderId: getPropValue('operationOrderId', testInputs),
			packingGradeId: getPropValue('packingGradeId', testInputs),
			productId: getPropValue('productId', testInputs),
			productTypeId: getPropValue('productTypeId', testInputs),
			screenType: getPropValue('screenType', testInputs),
			shiftType: getPropValue('shiftType', testInputs),
			entryDate: getPropValue('entryDate', testInputs),
			testUnitOfMeasure: getPropValue('testUnitOfMeasure', testInputs)
		}
	}
	parameters: TestCommonVariables;
}
