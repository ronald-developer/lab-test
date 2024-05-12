
export interface ResponseImportResultModel {
	recordsFound: number;
	recordsFailed: number;
	recordsCreated: number;
	recordsUpdated: number;
	errors: ImportError[];
	errorCount: number;
	hasErrors: boolean;
	criticalError: string;
	hasCriticalErrors: boolean;
}

export interface ImportError {
	errorMessage: string;
	lineNo: number;
}
