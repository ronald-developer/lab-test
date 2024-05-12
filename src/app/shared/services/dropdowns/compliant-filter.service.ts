import { Injectable } from "@angular/core";
import { SelectOption } from "../../models/select-option";

@Injectable({
    providedIn: 'root'
})
export class CompliantFilterService {
    public getAll(): SelectOption[] {
        const result = [];
        result.push(new SelectOption(null, 'All'));
        result.push(new SelectOption(false, 'Compliant'));
		result.push(new SelectOption(true, 'Non-compliant'));
        return result;
    }
}
