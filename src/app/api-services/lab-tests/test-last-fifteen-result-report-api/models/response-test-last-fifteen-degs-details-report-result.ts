import { ResponseDegsTestDetailReportResult } from "./response-degs-test-detail-report-result";
import { ResponseDegsTestSummaryReportEntry } from "./response-degs-test-summary-report-entry";

export interface ResponseTestLastFifteenDegsDetailsReportResult {
	entryCount: number;
	details: ResponseDegsTestDetailReportResult[];
	averageEntry: ResponseDegsTestSummaryReportEntry;
	standardDeviationEntry: ResponseDegsTestSummaryReportEntry;
}
