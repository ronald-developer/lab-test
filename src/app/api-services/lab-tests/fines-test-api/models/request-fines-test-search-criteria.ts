import { RequestLabTestSearchCriteria } from "../../common-models/request-lab-test-search-criteria";

export class RequestFinesTestSearchCriteria extends RequestLabTestSearchCriteria {
	public packingGradeId?: number;
	public finalScreenSize?: number;
}
