import { Injectable } from "@angular/core";
import { TestCommonVariables, LabTestVariables } from "../models/lab-test-variables";
import { DateTimeHelper } from "src/app/utils/date-time-helper-utils";

@Injectable({
	providedIn: 'root'
})
export class StoredLabTestParamsProvider {

	public storeParams(parameters: TestCommonVariables) {
		const value = JSON.stringify(parameters);
		localStorage.setItem('stored-lab-test-params', value)
	}

	public getParams() {
		const value = localStorage.getItem('stored-lab-test-params');
		if (value) {
			const data = JSON.parse(value) as TestCommonVariables;
			if(data.entryDate){
				data.entryDate = new Date(data.entryDate);
			}

			return data;
		}

		return null;
	}
}
