import { Injectable } from "@angular/core";
import { SampleType } from "../../models/sample-type";
import { SelectOption } from "../../models/select-option";

@Injectable({
	providedIn: 'root'
})
export class SampleTypeService {
	public getAll(): SelectOption[] {
		const result = [];
		result.push(new SelectOption(SampleType.SAS, 'SAS'));
		result.push(new SelectOption(SampleType.ISAS, 'ISAS'));
		return result;
	}
}
