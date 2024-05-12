import { Injectable } from "@angular/core";
import { SelectOption } from "../../models/select-option";
import { TestUom } from "../../models/test-uom";

@Injectable({
	providedIn: 'root'
})
export class TestUomService {
	public getAll(): SelectOption[] {
		const result = [];
		result.push(new SelectOption(TestUom.Pieces, 'Pieces'));
		result.push(new SelectOption(TestUom.Gramms, 'Gramms'));
		return result;
	}
}
