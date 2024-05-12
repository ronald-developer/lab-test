import { Injectable } from "@angular/core";
import { MaterialType } from "../../models/material-type";
import { SelectOption } from "../../models/select-option";

@Injectable({
	providedIn: 'root'
})
export class MaterialTypeService {
	public getAll(): SelectOption[] {
		const result = [];
		result.push(new SelectOption(MaterialType.Organic, 'Organic'));
		result.push(new SelectOption(MaterialType.InorganicNonSynthetic, 'InorganicNonSynthetic'));
		result.push(new SelectOption(MaterialType.InorganicSynthetic, 'InorganicSynthetic'));
		return result;
	}
}
