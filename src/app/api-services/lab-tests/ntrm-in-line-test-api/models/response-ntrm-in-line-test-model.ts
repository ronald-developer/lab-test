export interface ResponseNtrmInLineTestModel {
	id: string;
	operationOrderId: number;
	operationOrderDisplayNo: string;
	motherGradeId: number;
	motherGradeCode: string;
	dateCreated: Date;
	entryDate: string;
	productTypeId: number;
	packingGradeId: number;
	shiftType: number;
	shiftTypeTitle: string;
	testUnitOfMeasure: number;
	testUnitOfMeasureTitle: string;
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
	ntrmInLineTestId: string;
	ntrmLocationId: number;
	ntrmLocationName: string;
}
