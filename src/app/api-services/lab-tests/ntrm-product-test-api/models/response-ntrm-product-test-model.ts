
export interface ResponseNtrmProductTestModel {
	id: string;
	operationOrderId: number;
	operationOrderDisplayNo: string;
	motherGradeId: number;
	motherGradeCode:string;
	dateCreated: Date;
	entryDate: string;
	productTypeId: number;
	productTypeCode: string;
	packingGradeId: number;
	packingGradeCode: string;
	shiftType: number;
	shiftTypeTitle: string;
	testUnitOfMeasure: number;
	testUnitOfMeasureTitle:string;
	weed: number;
	wood: number;
	fibres: number;
	paper: number;
	feathers: number;
	insects: number;
	otherOrganic: number;
	otherOrganicType: string;
	rocks: number;
	metals: number;
	otherInorganicNonSynthetic: number;
	otherInorganicNonSyntheticType: string;
	nylon: number;
	rubber: number;
	foam: number;
	plastic: number;
	otherInorganicSynthetic: number;
	otherInorganicSyntheticType: string;
	ntrmProductTestId: string;
	sampleWeight: number;
	ntrmProductTest: string;
}
