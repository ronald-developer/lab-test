import { ResponseLabTestSearchResult } from "./response-lab-test-search-result";

export interface ResponsePackingGradeLabTestSearchResult extends ResponseLabTestSearchResult {
    packingGradeId: number;
    packingGradeCode: string;
}