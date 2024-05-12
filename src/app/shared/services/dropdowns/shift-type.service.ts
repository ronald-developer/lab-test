import { Injectable } from "@angular/core";
import { SelectOption } from "../../models/select-option";
import { ShiftType } from "../../models/shift-type";

@Injectable({
    providedIn: 'root'
})
export class ShiftTypeService {
    public getAll(): SelectOption[] {
        const result = [];
        result.push(new SelectOption(ShiftType.Day, 'Day'));
        result.push(new SelectOption(ShiftType.Night, 'Night'));
        return result;
    }
}
