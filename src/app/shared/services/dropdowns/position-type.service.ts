import { Injectable } from "@angular/core";
import { ChargerType } from "../../models/charger-type";
import { SelectOption } from "../../models/select-option";
import { PositionType } from "../../models/position-type";

@Injectable({
    providedIn: 'root'
})
export class PositionTypeService {
    public getAll(): SelectOption[] {
        const result = [];
        result.push(new SelectOption(PositionType.A, 'A'));
        result.push(new SelectOption(PositionType.B, 'B'));
        return result;
    }
}
