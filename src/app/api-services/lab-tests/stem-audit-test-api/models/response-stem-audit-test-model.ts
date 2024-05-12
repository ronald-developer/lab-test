import { SampleType } from "src/app/shared/models/sample-type";

export interface ResponseStemAuditTestModel {
	id: string;
	operationOrderId: number;
	entryDate: Date;
	containerNo: string;
	containerRange: string;
	sampleType: SampleType;
	obj: number;
	over7Mesh: number;
	over12Mesh: number;
	pan: number;
	totalStem: number;
	shakerId:string;
}
