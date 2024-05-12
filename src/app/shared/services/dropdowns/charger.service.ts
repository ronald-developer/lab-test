import { Injectable } from "@angular/core";
import { ChargerType } from "../../models/charger-type";
import { SelectOption } from "../../models/select-option";

@Injectable({
    providedIn: 'root'
})
export class ChargerTypeService {
    public getAll(): SelectOption[] {
        const result = [];
        result.push(new SelectOption(ChargerType.A, 'A'));
        result.push(new SelectOption(ChargerType.B, 'B'));
        result.push(new SelectOption(ChargerType.C, 'C'));
        result.push(new SelectOption(ChargerType.D, 'D'));
        return result;
    }
}
